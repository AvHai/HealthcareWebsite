import express from 'express';
import { getCurrentUser, askAi } from '../controllers/Users.controller.js';
import isAuth from '../middlewares/auth.middleware.js'

const userRouter = express.Router();


userRouter.get('/currentUser',isAuth, getCurrentUser);
userRouter.post('/askAi',isAuth,askAi);



export default userRouter;