// errors/business.errors.ts
import { AppError } from './app.error';

export class InsufficientStockError extends AppError {
  constructor(product: string, requested: number, available: number) {
    super(
      `Insufficient stock for ${product}. Requested: ${requested}, Available: ${available}`,
      400,
      'INSUFFICIENT_STOCK'
    );
  }
}

export class PaymentError extends AppError {
  constructor(message: string = 'Payment processing failed') {
    super(message, 400, 'PAYMENT_ERROR');
  }
}

export class BookAlreadyBorrowedError extends AppError {
  constructor(bookName: string) {
    super(`Book '${bookName}' is already borrowed`, 409, 'BOOK_ALREADY_BORROWED');
  }
}

export class MaxLimitReachedError extends AppError {
  constructor(limit: number) {
    super(`Maximum limit of ${limit} reached`, 400, 'MAX_LIMIT_REACHED');
  }
}