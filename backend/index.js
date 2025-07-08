import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './DB/dbConnect.js';
const app = express();
dotenv.config();


app.get('/', (req, res) => {
    res.send('Hello, World!');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    dbConnect();
  console.log(`Server is running on port ${PORT}`);
})