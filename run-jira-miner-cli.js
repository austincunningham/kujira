/**
 * Created by austin on 16/03/2017.
 */// jscs:ignore

'use strict';
var prompt = require('prompt');
var exec = require('child_process').exec;
var child;

// Start the prompt

prompt.start();

// Get three properties from the user: username , password and url and project
console.log('Enter username, password and url e.g. "issues.jboss.org"');
prompt.get(['username', 'password', 'url', 'project'], function (err, result) {

  // Log the results.

  console.log('Command-line input received:');
  console.log(' username: ' + result.username);
  console.log(' password: ********');
  console.log(' url: https://' + result.url);
  console.log(' project: ' + result.project);

  // execute jira-miner target to point at the source
  child = exec('jira-miner target https://' + result.url + ' --user ' + result.username +
      ' --password ' + result.password, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });


  // pull data from the target with populate, to populate local loki db
  child = exec('jira-miner populate "project in (' + result.project + ')"',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });


  // use jira-miner query to access a local search file
  child = exec('jira-miner query search --key=RAINCATCH-623 --json',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
});


