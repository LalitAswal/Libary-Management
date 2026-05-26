import {
  DataTypes,
  Model,
  Optional,
} from 'sequelize';

import sequelize
from '../config/db';

import {
  USER_ROLE,
  DEFAULT_USER_ROLE,
} from '../constants/constant';

/*
|--------------------------------------------------------------------------
| User Attributes
|--------------------------------------------------------------------------
*/

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  token?: string | null;
  role: number;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

/*
|--------------------------------------------------------------------------
| Creation Attributes
|--------------------------------------------------------------------------
*/

export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    'id' |
    'token' |
    'isDeleted'
  > {}

/*
|--------------------------------------------------------------------------
| User Model
|--------------------------------------------------------------------------
*/

class User
  extends Model<
    UserAttributes,
    UserCreationAttributes
  >
  implements UserAttributes
{
  public id!: number;

  public username!: string;

  public password!: string;

  public token!: string | null;

  public role!: number;

  public isDeleted!: boolean;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

/*
|--------------------------------------------------------------------------
| Initialize Model
|--------------------------------------------------------------------------
*/

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:
        DEFAULT_USER_ROLE,

      validate: {
        isIn: [
          Object.values(USER_ROLE),
        ],
      },
    },

    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },

  {
    sequelize,
    tableName: 'user',
    timestamps: true,
    modelName: 'User',
  }
);

export default User;