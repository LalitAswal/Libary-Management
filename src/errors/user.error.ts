// errors/user.errors.ts
import { AppError } from '../errors/app.error';
import { ConflictError, ValidationError } from '../errors/http.error';

export class UserNotFoundError extends AppError {
  constructor(identifier: string) {
    super(`User with ${identifier} not found`, 404, 'USER_NOT_FOUND');
  }
}

export class UserAlreadyExistsError extends ConflictError {
  constructor(field: string, value: string) {
    super(`User with ${field} '${value}' already exists`);
    this.errorCode = 'USER_ALREADY_EXISTS';
  }
}

export class InvalidPasswordError extends ValidationError {
  constructor() {
    super('Invalid password. Password must be at least 6 characters');
    this.errorCode = 'INVALID_PASSWORD';
  }
}

export class InvalidEmailError extends ValidationError {
  constructor() {
    super('Invalid email format');
    this.errorCode = 'INVALID_EMAIL';
  }
}

export class InvalidUsernameError extends ValidationError {
  constructor() {
    super('Username must be between 3 and 20 characters');
    this.errorCode = 'INVALID_USERNAME';
  }
}

export class AccountLockedError extends AppError {
  constructor(message: string = 'Account has been locked') {
    super(message, 403, 'ACCOUNT_LOCKED');
  }
}

export class EmailNotVerifiedError extends AppError {
  constructor(message: string = 'Please verify your email first') {
    super(message, 403, 'EMAIL_NOT_VERIFIED');
  }
}