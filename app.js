/**
 * Created by austin on 01/04/2017.
 */
'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const searchController = require('./controller/search');

// Added to parse json files that are posted or put
const bodyParser = require('body-parser');

const app = express();

// Add middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
// See the search Controller for `/search` routes
app.use('/search', searchController);

// Only listen when app.js is run - acceptance tests will listen on another port
app.listen(8000, function () {
  console.log('Listening at http://localhost:8000');
});


module.exports = app;