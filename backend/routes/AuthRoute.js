import express from 'express';
import { register, login } from '../controllers/Auth.controller.js';

const AuthRoute = express.Router();


AuthRoute.post('/register', register);
AuthRoute.post('/login', login);

export default AuthRoute;