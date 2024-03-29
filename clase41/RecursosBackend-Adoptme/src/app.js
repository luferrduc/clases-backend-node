import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerUiExpress from 'swagger-ui-express';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import __mainDirname from './utils/index.js';


import swaggerFile from '../swagger-output.json' assert { type: 'json' }

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect('mongodb+srv://lucianoferrando94:RxBWSWiQeU9Ic0Xy@cluster55575.ixldvmd.mongodb.net/clase41?retryWrites=true&w=majority')

app.use(express.json());
app.use(cookieParser());

app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile))

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
