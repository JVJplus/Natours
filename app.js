const express = require('express');
const morgan=require('morgan')
const baseRouter=require('./routes/base')
const tourRouter=require('./routes/tours')
const userRouter=require('./routes/users')


const app = express();
// MiddleWares
app.use(morgan('dev'));
// For Getting JSON POST datas
app.use(express.json());

// Routing 
app.use('/',baseRouter);
app.use('/api/v1/tours(s)?',tourRouter);
app.use('/api/v1/user(s)?',userRouter);

module.exports=app;