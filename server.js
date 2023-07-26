const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Database

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI ,{
  useNewUrlParser: true,
  useUnifiedTopology: true ,
})
  .then( () => {
      console.log('Connected to the MongoDB database "portfolio" ')
  })
  .catch( (err) => {
      console.error(`Error connecting to the database. n${err}`);
  })

//Middleware

const request_limiter = require ("./middlewares/request-limit")
app.use(request_limiter);

const pickIp = require ('./middlewares/pickIp')
app.use(pickIp);

  //Routes

const signupRoutes = require('./routes/auth/client/signup');
app.use('/auth/client/signup', signupRoutes);

const loginRoutes = require('./routes/auth/client/login');
app.use('/auth/client/login', loginRoutes);

const forgotpassword = require('./routes/auth/client/forgotpassword');
app.use('/auth/client/', forgotpassword);

const check_token = require('./routes/auth/client/check-token');
app.use('/auth/client/', check_token);


const port = 3001;
  app.listen(port, () => {
    //console.log(`Server is running on http://localhost:${port}`);
  });