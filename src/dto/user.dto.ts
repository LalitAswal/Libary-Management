import { Request } from 'express';

export interface RegisterDTO {
  userName: string;
  password: string;
  email: string;
}

export class UserDTO {
  static forRegister(req: Request): RegisterDTO {
    const { userName, password, email } = req.body;
    
    if (!userName || !password || !email) {
      throw new Error('Missing required fields');
    }
    
    return {
      userName: userName.trim(),
      password: password,
      email: email.trim().toLowerCase(),
    };
  }
}