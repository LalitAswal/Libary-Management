import express, {Response, Request} from 'express';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


// routes
import userRoutes from './routes/user.routes';



dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser()); 


// routes 

app.use('/user', userRoutes);

console.log(process.env.JWT_REFRESH_SECRET);
const server = createServer(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

export default server;