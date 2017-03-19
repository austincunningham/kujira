/**
 * Created by austin on 16/03/2017.
 */

'use strict';

//var sys = require('sys'); deprecated
//var util = require('util'); deprecated
let exec = require('child_process').exec;
let child;

// execute jira-miner target to point at the source
child = exec('jira-miner target https://issues.jboss.org --user usernamehere --password passwordhere', function (error, stdout, stderr) {
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

// a more concise way to run jira-miner populate (uses deprecated components of node)
/*
function puts(error, stdout, stderr) { sys.puts(stdout); }

exec('jira-miner populate "project in RAINCATCH"', puts);
*/

