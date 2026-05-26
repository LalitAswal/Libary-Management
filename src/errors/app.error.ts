// errors/app.error.ts
export class AppError extends Error {
  public  statusCode: number;
  public  isOperational: boolean;
  public  errorCode: string;
  public  timestamp: string;
  
  constructor(
    message: string,
    statusCode: number = 500,
    errorCode: string = 'INTERNAL_ERROR',
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
    
    // Set prototype explicitly for proper inheritance
    Object.setPrototypeOf(this, AppError.prototype);
  }
}