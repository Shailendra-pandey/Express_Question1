const express = require('express');
const { APP_PORT, DB_URL } = require('./config');
import mongoose from 'mongoose';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';
import passport from 'passport';
import init from './config/LoginPassport';
import initialize from './config/RegisterPassport';
const db = require('./models');
const sequelize = require('./models')


const app = express();

sequelize
  .authenticate()
  .then(() => {
    console.log("connection established successfully");
  })
  .catch((error) => {
    console.error("unable to connect", error);
  });

// mongoose.connect(DB_URL);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     console.log('DB connected');
// });

//login
init(passport);

//register
initialize(passport);


app.use(express.json());
app.use(routes);



app.use(errorHandler);
app.listen(APP_PORT, () => console.log(`listening on port ${APP_PORT}`));