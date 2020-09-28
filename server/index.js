const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const auth = require('./auth/index')
require('dotenv').config();
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('mongodb is connected');
}).catch((error) => {
  console.log('mongodb not connected');
  console.log(error);
});

app.use(morgan('dev'));
app.use(bodyParser.json()); 

app.get('/', (req,res) => {
  res.json({
    message: "Hello world"
  });
});

app.use('/auth', auth); // here /auth is pre-pended to the links to be send in this.

function notFound(req, res, next) {
  res.status(404);
  const error = new Error ('Not Found - ' + req.originalUrl);
}

function errorHandle(err,req,res,next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandle);

port = process.env.port || 4000
app.listen(port, () => {
  console.log('Web Server is listening at port ', port);
});