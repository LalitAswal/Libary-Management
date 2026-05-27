import { Request, Response } from "express";

import {userService} from "../bootstrap/user.bootstrap";

export default class UserController {

  registration = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userName, password, email } = req.body;

      if (!userName || !password) {
        throw new Error("Incorrect Details");
      }

      await userService.register(userName, password, email);

      res.status(200).json({
        message: "User Register Successfully",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(409).json({
          message: error.message,
        });

        return;
      }

      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userName, password } = req.body;

      if (!userName || !password) {
        throw new Error("Incorrect username or password");
      }

      // Service should return tokens, not user
      const { accessToken, refreshToken } = await userService.login(
        userName,
        password,
      );

      const isProduction = process.env.NODE_ENV === "production";

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: isProduction ? "none" : "lax",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({
        message: "User logged in successfully",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(401).json({
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  signOut = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies.refreshToken;  

      const result = await userService.signOut(refreshToken);

      if (result) { 
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({
          message: "User signed out successfully",
        }); 
      }
    }
      catch (error: unknown) {
        if (error instanceof Error) {
          res.status(400).json({
            message: error.message,
          });
          return;
        } else {
          res.status(500).json({
            message: "Internal Server Error",
          });
        }     
      }
    }
}
