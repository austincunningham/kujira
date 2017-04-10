/**
 * Created by acunningham on 20/03/17.
 */

'use strict';
const prompt = require('prompt');
const colors = require('colors/safe');

const target = require('./target.js');
const populate = require('./populate.js');
const query = require('./query.js');

//using callbacks to run in order
target(function () {
  populate(function () {
    query(function () {
      //they should finish in order
      console.log('End of search');
    });
  });
});

