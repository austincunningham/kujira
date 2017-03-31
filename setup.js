/**
 * Created by acunningham on 20/03/17.
 */

'use strict';
var prompt = require('prompt');
var colors = require('colors/safe');

var target = require('./target.js');
var populate = require('./populate.js');
var query = require('./query.js');

//using callbacks to run in order
target(function () {
  populate(function () {
    query(function () {
      //they should finish in order
      console.log('End of search');
    });
  });
});

