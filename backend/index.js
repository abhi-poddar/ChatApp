import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './DB/dbConnect.js';
import authRouter from './route/authUser.js';
import messageRouter from './route/messageRout.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
app.use(express.json());

app.use(cookieParser());

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)

app.get('/', (req, res) => {
    res.send('Server is working');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    dbConnect();
  console.log(`Server is running on port ${PORT}`);
})