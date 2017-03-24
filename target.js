/**
 * Created by acunningham on 20/03/17.
 */
'use strict';
var prompt = require('prompt');
var colors = require("colors/safe");
var exec = require('child_process').exec;
var child;

var schema = {
  properties: {
    username: {
      description: colors.blue('Enter your Jira Username'),
      pattern: /^[a-zA-Z0-9._-]+$/,
      message: 'Username must be characters, numbers, dots, underscores and dashes',
      required: true,
    },
    password: {
      description: colors.blue('Enter your Jira password'),
      pattern: /^[a-zA-Z0-9]+$/,
      hidden: true,
      message: 'Invalid characters in password',
      replace: '*',
      required: true,
    },
    url: {
      description: colors.blue('Enter Jira URL e.g. "issues.jboss.org"'),
      pattern: /^[a-zA-Z0-9._-]+$/,
      message: 'url must be a valid',
      required: true,
    },
  },
}

// Start the prompt

prompt.start();
var target = function() {
  prompt.message = colors.green("-->");
  prompt.delimiter = colors.green(":");
// Get three properties from the user: username , password and url and project
  console.log('Enter username, password and url e.g. "issues.jboss.org"');
  prompt.get(schema, function (err, result) {

//prompt.get(['username', 'password', 'url'], function (err, result) {

    // Log the results.

    console.log('Command-line input received:');
    console.log(' username: ' + result.username);
    console.log(' password: ********');
    console.log(' url: https://' + result.url);

    // execute jira-miner target to point at the source
    child = exec('jira-miner target https://' + result.url + ' --user ' + result.username +
        ' --password ' + result.password, function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
      /*if (stdout != false) {
        prompt.stop();
      }*/
    });
  });
}


module.exports = target;
