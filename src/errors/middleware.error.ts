// middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app.error';

interface ErrorResponse {
  success: boolean;
  message: string;
  errorCode: string;
  timestamp: string;
  path?: string;
  stack?: string;
}

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error for debugging
  console.error('Error occurred:', {
    name: error.name,
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  // Handle custom AppError
  if (error instanceof AppError) {
    const response: ErrorResponse = {
      success: false,
      message: error.message,
      errorCode: error.errorCode,
      timestamp: error.timestamp,
      path: req.path,
    };

    // Add stack trace in development
    if (process.env.NODE_ENV !== 'production') {
      response.stack = error.stack;
    }

    return res.status(error.statusCode).json(response);
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
      errorCode: 'INVALID_TOKEN',
      timestamp: new Date().toISOString(),
      path: req.path,
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token has expired',
      errorCode: 'TOKEN_EXPIRED',
      timestamp: new Date().toISOString(),
      path: req.path,
    });
  }

  // Handle Prisma errors (if using Prisma)
  if (error.name === 'PrismaClientKnownRequestError') {
    // Handle duplicate unique constraint
    if ((error as any).code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Duplicate entry',
        errorCode: 'DUPLICATE_ENTRY',
        timestamp: new Date().toISOString(),
        path: req.path,
      });
    }
    
    // Handle record not found
    if ((error as any).code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Record not found',
        errorCode: 'RECORD_NOT_FOUND',
        timestamp: new Date().toISOString(),
        path: req.path,
      });
    }
  }

  // Handle multer errors
  if (error.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: error.message,
      errorCode: 'FILE_UPLOAD_ERROR',
      timestamp: new Date().toISOString(),
      path: req.path,
    });
  }

  // Default error (unexpected)
  const response: ErrorResponse = {
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : error.message,
    errorCode: 'INTERNAL_SERVER_ERROR',
    timestamp: new Date().toISOString(),
    path: req.path,
  };

  if (process.env.NODE_ENV !== 'production') {
    response.stack = error.stack;
  }

  return res.status(500).json(response);
};