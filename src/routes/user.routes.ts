import express, {Request, Response} from 'express';
import { userController } from '../bootstrap/index';
// import { userAuth } from '../middleware/auth.ts';
// import { checkPermission } from '../middleware/roleMiddleWare.ts';
const router = express.Router();

// file upload
import multer, {FileFilterCallback} from 'multer';

let storage = multer.diskStorage({
  destination: (req:Request, file:Express.Multer.File, cb) => {
    cb(null, './uploads');
  },
  filename: (req:Request, file:Express.Multer.File, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage });

// user routes
router.post('/register', userController.registration);
router.post('/login', userController.login);
router.post('/signOut', userController.signOut);
// router.post('/refreshToken', userController.refreshTokenHandler);
// router.get('/profile', userAuth, userController.getUserDetails);
// router.post('/userUpdate', userAuth, checkPermission('update'), userController.userUpdate);
// router.get('/borrowedBookList', userAuth, checkPermission('viewAll'), userBorrowedBookList);

// // admin routes
// router.get('/', getAllUsers);
// router.post('/bulkAddUser', upload.single('file'), addBulkUser); // add bulk user
// router.delete('/:id', userAuth, checkPermission('deleteDate'), deleteUser);

export default router;
