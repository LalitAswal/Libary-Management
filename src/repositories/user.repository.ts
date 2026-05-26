// repositories/user.repository.ts
import User from "../models/user.model";

interface userData {
  username: string;
  password: string;
  email?: string;
  role?: number;
}

interface updateData {
  username?: string;
  role?: number;
}

export default class UserRepository {
  constructor() {}

  createUser = async (userData: userData) => {
    try {
      const createData: any = {
        username: userData.username,
        password: userData.password,
      };

      if (userData.email !== undefined) {
        createData.email = userData.email;
      }

      if (userData.role !== undefined) {
        createData.role = userData.role;
      }

      const user = await User.create(createData);
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unknown error creating user");
    }
  };

  findUser = async (userName: string) => {
    try {
      const user = await User.findOne({
        where: {
          username: userName,
        },
      });
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unknown error finding user");
    }
  };

  removeToken = async (id: string) => {
    try {
      const user = await User.findByPk(id);

      if (user) {
        user.token = null;
        await user.save();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unknown error removing token");
    }
  };
  AllUsers = async () => {
    const result = await User.findAll({
      where: {
        role: "member",
      },
    });

    if (result.length < 1) {
      throw new Error(`no member list found `);
    }
    return result;
  };

  updateUser = async (id: string, updateData: updateData) => {
    try {
      let updateFields: { username?: string; role?: number } = {};
      if (updateData.username) {
        updateFields.username = updateData.username;
      }
      if (updateData.role) {
        updateFields.role = updateData.role;
      }
      const result = await User.update(
    { ...updateFields },
    {
      where: {
        id: id,
      },
      returning: true,
    }
  );

  return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unknown error updating user");
    }
  }
}
