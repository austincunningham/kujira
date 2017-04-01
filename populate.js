/**
 * Created by acunningham on 20/03/17.
 */

'use strict';
const prompt = require('prompt');
const colors = require('colors/safe');
const exec = require('child_process').exec;
let child;

//validation for prompt see https://www.npmjs.com/package/prompt

const schema = {
  properties: {
    project: {
      description: colors.blue('Enter the project name e.g. "RHMAP or RAINCATCH"'),
      pattern: /^[a-zA-Z0-9._-]+$/,
      message: 'Must be a valid project',
      required: true,
    },
  },
};

// Start the prompt

prompt.start();
prompt.message = colors.green('-->');
prompt.delimiter = colors.green(':');

const populate = function (callback) {

  // Get three properties from the user: username , password and url and project

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

      //checks standard out is present and the callback is a function
      if (typeof callback === 'function' && stdout != false) {
        callback();
      }
    });
  });
};

module.exports = populate;
