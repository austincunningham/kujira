/**
 * Created by austin on 01/04/2017.
 */
'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const expressHbs = require('express-handlebars');
const apiController = require('./controller/api');
const accountsController = require('./controller/accounts');

// Added to parse json files that are posted or put
const bodyParser = require('body-parser');

const app = express();

// Add middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
//app.set('views','./views');
// See the Controller for routes,
app.use('/api', apiController);
app.use('/',accountsController);


app.engine('hbs', expressHbs({extname:'hbs',
  defaultLayout:'layout.hbs',
  relativeTo: __dirname}));
app.set('view engine', 'hbs');


// Only listen when app.js is run - acceptance tests will listen on another port
app.listen(8000, function () {
  console.log('Listening at http://localhost:8000');
});


module.exports = app;