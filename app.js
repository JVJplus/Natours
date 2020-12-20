const express = require('express');
const morgan = require('morgan');
const baseRouter = require('./routes/baseRoutes');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// MiddleWares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// For Getting JSON POST datas
app.use(express.json());

// Routing
app.use('/', baseRouter);
app.use('/api/v1/tours(s)?', tourRouter);
app.use('/api/v1/user(s)?', userRouter);

module.exports = app;
