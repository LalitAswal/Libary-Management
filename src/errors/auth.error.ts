// errors/auth.errors.ts
import { AppError } from './app.error';

export class AuthenticationError extends AppError {
  constructor(message: string = 'Invalid credentials') {
    super(message, 401, 'AUTHENTICATION_FAILED');
  }
}

export class TokenExpiredError extends AppError {
  constructor(message: string = 'Token has expired') {
    super(message, 401, 'TOKEN_EXPIRED');
  }
}

export class TokenInvalidError extends AppError {
  constructor(message: string = 'Invalid token') {
    super(message, 401, 'TOKEN_INVALID');
  }
}

export class TokenMissingError extends AppError {
  constructor(message: string = 'Token is required') {
    super(message, 401, 'TOKEN_MISSING');
  }
}

export class InsufficientPermissionError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'INSUFFICIENT_PERMISSIONS');
  }
}