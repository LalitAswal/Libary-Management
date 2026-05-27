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
        role: userData.role !== undefined ? userData.role : 0,
      };

      if (userData.email) {
        createData.email = userData.email;
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

  removeToken = async (id: string): Promise<boolean> => {
    try {
      const user = await User.findByPk(id);

      if (user) {
        user.token = null;
        await user.save();
        return true;
      }
      return false;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unknown error removing token");
    }
  };

  AllUsers = async () => {
    try {
      const result = await User.findAll({
        where: {
          role: "member",
        },
      });

      if (result.length < 1) {
        throw new Error(`No member list found`);
      }
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unknown error fetching users");
    }
  };

  updateUser = async (id: string, updateData: updateData) => {
    try {
      let updateFields: { username?: string; role?: number } = {};
      
      if (updateData.username) {
        updateFields.username = updateData.username;
      }
      if (updateData.role !== undefined) {  
        updateFields.role = updateData.role;
      }

      if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
      }

      const result = await User.update(
        updateFields,
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
  };

  addBulkUser = async (users: userData[]) => {
    try {
      const usersWithDefaults = users.map(user => ({
        username: user.username,
        password: user.password,
        role: user.role !== undefined ? user.role : 0,
        ...(user.email && { email: user.email }),
      }));

      const createdUsers = await User.bulkCreate(usersWithDefaults);
      return createdUsers;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unknown error adding bulk users");
    }
  };

  deleteUser = async (id: string): Promise<boolean> => {
    try {
      const [affectedCount] = await User.update(
        { isDeleted: true },
        { 
          where: { id: id },
          returning: false  
        }
      );

      if (affectedCount === 0) {
        throw new Error(`User with id ${id} not found`);
      }

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unknown error deleting user");
    }
  };
}