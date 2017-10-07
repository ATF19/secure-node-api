/**
**   This is the main entry for our application
**/

// Packages imports
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/users');

// Defining our database route and connecting to it
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api-auth');

// Constructing our express app instance in the app constant
const app = express();

// Configuring our app instance to use MorganJS and BodyParser
app.use(morgan('dev'));
app.use(bodyParser.json());

// Setting up our HTTP routes
app.use('/users', routes);

// Running the app
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`App running at ${port}`);
