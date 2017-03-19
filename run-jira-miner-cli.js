/**
 * Created by austin on 16/03/2017.
 */

'use strict';
var prompt = require('prompt');
//var sys = require('sys'); deprecated
//var util = require('util'); deprecated
let exec = require('child_process').exec;
let child;

// Start the prompt

prompt.start();

// Get two properties from the user: username and email

prompt.get(['username', 'password'], function (err, result) {
  // Log the results.

  console.log('Command-line input received:');
  console.log('  username: ' + result.username);
  console.log('  password: ' + result.password);

  // execute jira-miner target to point at the source
  child = exec('jira-miner target https://issues.jboss.org --user ' + result.username + ' --password ' + result.password, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

  // pull data from the target with populate, to populate local loki db
  child = exec('jira-miner populate "project in (RAINCATCH)"', function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

  // use jira-miner query to access a local search file
  child = exec('jira-miner query search --key=RAINCATCH-623 --json', function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
});

// a more concise way to run jira-miner populate (uses deprecated components of node)
/*
function puts(error, stdout, stderr) { sys.puts(stdout); }

exec('jira-miner populate "project in RAINCATCH"', puts);
*/

