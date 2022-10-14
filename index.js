const express = require('express');
const { APP_PORT, DB_URL } = require('./config');
import mongoose from 'mongoose';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';

const app = express();

mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected');
});


app.use(express.json());
app.use(routes);



app.use(errorHandler);
app.listen(APP_PORT, ()=> console.log(`listening on port ${APP_PORT}`));