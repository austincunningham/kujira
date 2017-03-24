/**
 * Created by acunningham on 20/03/17.
 */
'use strict';
var prompt = require('prompt');
var exec = require('child_process').exec;
var child;

//validation for prompt see https://www.npmjs.com/package/prompt
var schema = {
  properties: {
    key: {
      description: colors.blue('Enter the project name e.g. "RHMAP or RAINCATCH"'),
      pattern: /^[a-zA-Z0-9._-]+$/,
      message: 'Must be a valid project',
      required: true,
    },
    format: {
      description: colors.blue('Enter format either json or csv ,enter for default tsv'),
      pattern: /^[a-z]+$/,
      required: false,
    },
  }
};

// Start the prompt

prompt.start();
prompt.message = colors.green("-->");
prompt.delimiter = colors.green(":");

// Get three properties from the user: username , password and url and project
//console.log('Enter key e.g. "RAINCATCH-623"');
//prompt.get(['key'], function (err, result) {
prompt.get(schema, function(err, result) {

  // use jira-miner query to access a local search file --key=RAINCATCH-623
  child = exec('jira-miner query search --key=' + result.key + ' --'+ result.format,
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
});
