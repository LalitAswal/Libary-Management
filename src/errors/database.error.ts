// errors/database.errors.ts
import { AppError } from './app.error';

export class DatabaseError extends AppError {
  constructor(message: string = 'Database error occurred') {
    super(message, 500, 'DATABASE_ERROR');
  }
}

export class DuplicateEntryError extends AppError {
  constructor(field: string, value: string) {
    super(`${field} '${value}' already exists`, 409, 'DUPLICATE_ENTRY');
  }
}

export class RecordNotFoundError extends AppError {
  constructor(resource: string, id?: string | number) {
    const message = id 
      ? `${resource} with id '${id}' not found`
      : `${resource} not found`;
    super(message, 404, 'RECORD_NOT_FOUND');
  }
}

export class ForeignKeyError extends AppError {
  constructor(message: string = 'Related record not found') {
    super(message, 400, 'FOREIGN_KEY_ERROR');
  }
}