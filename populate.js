/**
 * Created by acunningham on 20/03/17.
 */
'use strict';
var prompt = require('prompt');
var exec = require('child_process').exec;
var child;

// Start the prompt

prompt.start();

// Get three properties from the user: username , password and url and project
//console.log('Enter project name  e.g. "RAINCATCH or RHMAP"');
prompt.get(['project'], function (err, result) {

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
  });
});