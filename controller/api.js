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
      ' --password ' + req.body.password,{maxBuffer: 1024 * 20000}, function (error, stdout, stderr) {
    res.status(200).json(stdout);
    if (stderr !== null){
      res.status(400).json(stderr);
    }
    if (error !== null) {
      res.status(500).json(error);
    }
  });
});

//jira-miner populate takes json input project
router.post('/populate', function (req, res) {
  // execute jira-miner target to point at the source
  child = exec('jira-miner populate "project in (' + req.body.project + ')"',{maxBuffer: 1024 * 20000}, function (error, stdout, stderr) {
    res.status(200).json(stdout);
    if (stderr !== null){
      res.status(400).json(stderr);
    }
    if (error !== null) {
      res.status(500).json(error);
    }
  });
});

// jira-miner query takes in an array of field value objects
router.post('/query', function (req, res){
  let searchString = '';
  for (let i = 0; i < req.body.length; i++){
    searchString += '--' + req.body[i].field +'='+ req.body[i].value +' ';
  }
  child = exec('jira-miner query search ' + searchString + '--json',{maxBuffer: 1024 * 20000}, function (error, stdout, stderr) {
    stdout = JSON.parse(stdout);
    res.status(200).json(stdout);
    if (stderr !== null){
      res.status(400).json(stderr);
    }
    if (error !== null) {
      res.status(500).json(error);
    }
  });
});


module.exports = router;