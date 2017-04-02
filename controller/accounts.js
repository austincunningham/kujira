/**
 * Created by austin on 02/04/2017.
 */

'use strict';

const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
let child;

//jira-miner target takes json input url,username and password
router.get('/', function (req, res) {
  res.render('index',{title: 'Welcome to Kujira'});
});

router.get('/login', function(req, res){
  res.render('login',{
    title: 'Login to Kujira'
  });
});

router.get('/home', function (req, res) {
  res.render('home',{
    title: 'Kujira Home'
  });
});

router.post('/login', function(req, res){
  child = exec('jira-miner target https://' + req.body.url + ' --user ' + req.body.username +
      ' --password ' + req.body.password, function (error, stdout, stderr) {
    if (stdout.indexOf('Successfully targeted JIRA') >= 0 ){
      res.render('home',{title:'Kujira Home'});
    }
    //res.status(200).json(stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
});

module.exports = router;