/**
 * Created by acunningham on 20/03/17.
 */

'use strict';
const colors = require('colors/safe');
const readlineSync = require('readline-sync');
const exec = require('child_process').exec;
let child;

// Get three properties from the user: username , password and url and project

const query = function (callback) {
  let field;
  let value;
  let searchString = '';
  let yesNo = '';
  let format;
  format = readlineSync.question('Enter format either json or csv ,enter for default tsv : ');
  while (yesNo !== 'y') {
    field = readlineSync.question('Enter the field you wish to search for : ');
    value = readlineSync.question('Enter the value you wish to search for : ');
    yesNo = readlineSync.question('Enter "y" quit or enter to continue : ');
    searchString = '--' + field + '=' + value + ' ' + searchString;
    console.log(yesNo, searchString);
  }

  child = exec('jira-miner query search ' + searchString + ' --' + format,
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
};

module.exports = query;
