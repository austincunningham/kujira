/**
 * Created by acunningham on 20/03/17.
 */

'use strict';
var prompt = require('prompt');
var query = require('./query.js');
var colors = require('colors/safe');
var exec = require('child_process').exec;
var child;

// Start the prompt

var populate = function (callback) {
  //validation for prompt see https://www.npmjs.com/package/prompt

  var schema = {
    properties: {
      project: {
        description: colors.blue('Enter the project name e.g. "RHMAP or RAINCATCH"'),
        pattern: /^[a-zA-Z0-9._-]+$/,
        message: 'Must be a valid project',
        required: true,
      },
    },
  };

  prompt.start();
  prompt.message = colors.green('-->');
  prompt.delimiter = colors.green(':');

  // Get three properties from the user: username , password and url and project
  //console.log('Enter project name  e.g. "RAINCATCH or RHMAP"');
  //prompt.get(['project'], function (err, result) {

  prompt.get(schema, function (error, result) {
    // Log the results.
    console.log(' project: ' + result.project);

    // pull data from the target with populate, to populate local loki db
    child = exec('jira-miner populate "project in (' + result.project + ')"',
    function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }

      if (stdout != false) {
        prompt.emit('stop');
        query();
      }
      /*if (typeof callback === 'function') {
        callback;
      }*/
    });
  });
};

module.exports = populate;
