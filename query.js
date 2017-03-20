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
//console.log('Enter key e.g. "RAINCATCH-623"');
prompt.get(['key'], function (err, result) {

  // use jira-miner query to access a local search file --key=RAINCATCH-623
  child = exec('jira-miner query search --key='+result.key+'--json',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
});