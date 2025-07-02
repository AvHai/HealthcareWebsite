import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import AuthRoute from './routes/AuthRoute.js';
import userRouter from './routes/UserRoute.js';
import CommunityInfoRoute from './routes/Communityinfo.routes.js';
import medicalCampRouter from './routes/MedicalCampRoute.js';


dotenv.config({
    path : ".env"
})

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGODB_CONN, { dbName: 'careLink' })
  .then(() => console.log("Database connected"))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});

app.use('/api/auth', AuthRoute);
app.use('/api/user', userRouter)
app.use('/api/communityinfo', CommunityInfoRoute);
app.use('/api/medicalcamp', medicalCampRouter);

app.use((err, req, res, next) => { 
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
}
);