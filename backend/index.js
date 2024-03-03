import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json()); 

//Middleware for handling CORS policy
// Option 1: Allow all origins with default of CORS(')
app.use(cors());

//Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to Bookstore');
});

app.use('/books', booksRoute);

mongoose
   .connect(mongoDBURL)
   .then(() => {
    console.log('connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening on port: ${PORT}`);
    });
   })
   .catch((error) => {
    console.log(error);
   });