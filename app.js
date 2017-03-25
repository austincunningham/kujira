/**
 * Created by acunningham on 20/03/17.
 */

'use strict';
var prompt = require('prompt');
var colors = require('colors/safe');

var target = require('./target.js');
var populate = require('./populate.js');
var query = require('./query.js');

target(function () {
  populate(function () {
    query(function () {
      //they should finish in order
    });
  });
});

