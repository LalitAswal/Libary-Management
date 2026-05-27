import UserController from "../controllers/user.controller";

import UserService from "../services/user.service";

import UserRepository from "../repositories/user.repository";

export const userService = new UserService();

export const userController = new UserController();

export const userRepository = new UserRepository();
