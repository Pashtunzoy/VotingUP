import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors' ;
import dotenv from 'dotenv';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from './src/config/main';
import User from './src/config/models/user';
import jwtStrategy from './src/config/auth/passport';
import apiRouter from './src/config/Routes/apiRoutes';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(passport.initialize());
mongoose.connect(config.database);
jwtStrategy(passport);




app.use(cors({ origin: '*' }));
app.use('/api', apiRouter());

app.get('*', function(req, res) {
  res.send(`API ENDPOINT FOR VOTEUP`);
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`http://localhost:${port}`);
});
