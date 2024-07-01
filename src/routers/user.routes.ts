import express from 'express';
import { UserController } from '../controllers/user.controller';
import { loginUser } from '../controllers/auth.controller';

const user_router = express.Router();
let controller = new UserController()

user_router.post('/register', controller.registerUser);
user_router.post('/login', loginUser);


export default user_router;