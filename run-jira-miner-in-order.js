/**
 * Created by austin on 16/03/2017.
 * node version 6.9.5
 */// jscs:ignore

'use strict';
var prompt = require('prompt');
var exec = require('child_process').exec;
var child;

//validation for prompt see https://www.npmjs.com/package/prompt
var schema = {
  properties: {
    username: {
      description: 'Enter your Jira Username',
      pattern: /^[a-zA-Z0-9._-]+$/,
      message: 'Username must be characters, numbers, dots, underscores and dashes',
      required: true,
    },
    password: {
      description: 'Enter your Jira password',
      pattern: /^[a-zA-Z0-9]+$/,
      hidden: true,
      message: 'Invalid characters in password',
      replace: '*',
      required: true,
    },
    url: {
      description: 'Enter Jira URL e.g. "issues.jboss.org"',
      pattern: /^[a-zA-Z0-9._-]+$/,
      message: 'url must be a valid',
      required: true,
    },
    project: {
      description: 'Enter the project name e.g. "RHMAP or RAINCATCH"',
      pattern: /^[a-zA-Z0-9._-]+$/,
      message: 'Must be a valid project',
      required: true,
    },
    format: {
      description: 'Enter format either json or csv ,enter for default tsv',
      pattern: /^[a-z]+$/,
      required: false,
    },
  },
};

// Start the prompt

prompt.start();

// Get three properties from the user: username , password and url and project
console.log('Enter username, password and url e.g. "issues.jboss.org"');
prompt.get(schema, function (err, result) {

  //prompt.get(['username', 'password', 'url', 'project'], function (err, result) {
  // Log the results.

  console.log('Command-line input received:');
  console.log(' username: ' + result.username);
  console.log(' password: ********');
  console.log(' url: https://' + result.url);
  console.log(' project: ' + result.project);

  // execute jira-miner target to point at the source
  child = exec('jira-miner target https://' + result.url + ' --user ' + result.username + ' --password ' + result.password,{maxBuffer: 1024 * 20000}, function(error, stdout, stderr){
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      // pull data from the target with populate, to populate local loki db
      child = exec('jira-miner populate "project in (' + result.project + ')"',{maxBuffer: 1024 * 9000}, function (error, stdout, stderr){
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        } else {
          // use jira-miner query to access a local search file
          child = exec('jira-miner query search --key=RAINCATCH-623 --' + result.format,{maxBuffer: 1024 * 9000}, function (error, stdout, stderr){
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
              console.log('exec error: ' + error);
            }
          });
        }
      });
    }
  });
});

