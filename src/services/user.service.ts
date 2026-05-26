import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { userRepository } from "../bootstrap/user.bootstrap";

export default class UserService {
  register = async (userName: string, password: string, email: string) => {
    const existingUser = await userRepository.findUser(userName);

    if (existingUser?.dataValues) {
      throw new Error("Username already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      username: userName,
      password: hashedPassword,
      email,
    };

    const newUser = await userRepository.createUser(userData);

    return newUser?.id;
  };

  // In UserService class
  login = async (
    userName: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const user = await userRepository.findUser(userName);

    if (!user) {
      throw new Error("Incorrect username or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect username or password");
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { userId: user.id, userName: user.username },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" },
    );

    return { accessToken, refreshToken };
  }
  ;

  signOut = async (token: string) => {
  try {
    if (!token) {
      throw new Error('Token is required');
    }
    
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!refreshSecret) {
      throw new Error('JWT_REFRESH_SECRET not configured');
    }
    
    const decoded = jwt.verify(token, refreshSecret) as { id: string };
    const result = await userRepository.removeToken(decoded.id);
    return result;
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error');
  }
};
updateUser = async (id: string,  username:string, role:number) => {
  try {
    let updateData: { username?: string; role?: number } = {};
   if (username) {
    updateData.username = username;
  }

  if (role) {
    updateData.role = role;
  }
    const updatedUser = await userRepository.updateUser(id, updateData);
    return updatedUser;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error updating user");
  }
};
}
