/**
 * Created by austin on 01/04/2017.
 */

'use strict';

const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
let child;

//jira-miner target takes json input url,username and password
router.post('/target', function (req, res) {
  // execute jira-miner target to point at the source
  child = exec('jira-miner target https://' + req.body.url + ' --user ' + req.body.username +
      ' --password ' + req.body.password, function (error, stdout, stderr) {
    res.status(200).json(stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
});

//jira-miner populate takes json input project
router.post('/populate', function (req, res) {
  // execute jira-miner target to point at the source
  console.log(req.body.project);
  console.log('jira-miner populate "project in (' + req.body.project + ')"');
  child = exec('jira-miner populate "project in (' + req.body.project + ')"', function (error, stdout, stderr) {
    res.status(200).json(stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
});

// jira-miner query takes in an array of field value objects
router.post('/query', function (req, res){
  console.log(req.body);
  let searchString = '';
  for (let i = 0; i < req.body.length; i++){
    searchString += '--' + req.body[i].field +'='+ req.body[i].value +' ';
    console.log(searchString);
  }
  console.log('jira-miner query search ' + searchString + '--json')
  child = exec('jira-miner query search ' + searchString + '--json', function (error, stdout, stderr) {
    stdout = JSON.parse(stdout);
    res.status(200).json(stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }

  });
});


module.exports = router;