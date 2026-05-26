import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

/*
|--------------------------------------------------------------------------
| Database URL
|--------------------------------------------------------------------------
*/

const database: string =
  process.env.DB_URL ||
  'postgresql://username:password@host/database?sslmode=require';

/*
|--------------------------------------------------------------------------
| Sequelize Instance
|--------------------------------------------------------------------------
*/

const sequelizeDB = new Sequelize(
  database,
  {
    dialect: 'postgres',

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },

    logging: false,
  }
);

/*
|--------------------------------------------------------------------------
| Database Connection
|--------------------------------------------------------------------------
*/

sequelizeDB
  .authenticate()
  .then(() => {
    console.log(
      ' Database connected successfully'
    );
  })
  .catch((error: Error) => {
    console.error(
      ' Database connection error:',
      error.message
    );
  });

/*
|--------------------------------------------------------------------------
| Sync Database Models
|--------------------------------------------------------------------------
*/

sequelizeDB
  .sync({ alter: true })
  .then(() => {
    console.log(
      ' Database models synced'
    );
  })
  .catch((error: Error) => {
    console.error(
      ' Error syncing models:',
      error.message
    );
  });

export default sequelizeDB;