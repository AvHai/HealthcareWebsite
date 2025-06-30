import User from '../models/Users.model.js';
import bcrypt from 'bcryptjs';
import  gentoken  from '../helpers/token.js';
import { handleSuccess } from '../helpers/handleSuccess.js';
import { handleError } from '../helpers/handleError.js';

export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.find ({ email });
        if (!existingUser) {
            return handleError(res, 400, 'User already exists with this email');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        const token = await gentoken(newUser._id, newUser.role);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        handleSuccess(res, 201, 'User registered successfully');
    } catch (error) {
        return handleError(res, 500, 'Registration failed', error);
    }
}  

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
      
        if (!user) {    
            return handleError(res, 400, 'Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) { 
            return handleError(res, 400, 'Invalid email or password');
        }
        const token = await gentoken(user._id, user.role);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        handleSuccess(res, 200, 'Login successful', { user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        return handleError(res, 500, 'Login failed', error);
    }
}