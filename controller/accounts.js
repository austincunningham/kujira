/**
 * Created by austin on 02/04/2017.
 */

'use strict';

const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const session = require('express-session');
let child;
let sess;

//jira-miner target takes json input url,username and password
// open route welcome screen
router.get('/', function (req, res) {
  res.render('index',{title: 'Welcome to Kujira'});
});

// open route login
router.get('/login', function(req, res){
  res.render('login',{
    title: 'Login to Kujira'
  });
});

// /logout destroy session cookie and redirect to welcome
router.get('/logout', function(req, res){
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    } else {
      res.render('index',{title: 'Welcome to Kujira'});
    }
  });
});

// /home check session username and allow access, cookie invalid deny access
router.get('/home', function (req, res) {
  sess=req.session;
  if(sess.username){
    res.render('home',{title: 'Kujira Home'});
  } else {
    res.render('index',{title:'Welcome to Kujira'})
  }

});

// /login if successful applies the current username to the cookie
router.post('/login', function(req, res){
  sess = req.session;
  child = exec('jira-miner target https://' + req.body.url + ' --user ' + req.body.username +
      ' --password ' + req.body.password, function (error, stdout, stderr) {
    if (stdout.indexOf('Successfully targeted JIRA') >= 0 ){
      sess.username = req.body.username;
      res.render('home',{title:'Kujira Home'});
    }else{
      res.render('login',{title:'Login to Kujira'})
    }
  });
});

// /home post project
router.post('/home', function(req, res){
// execute jira-miner target to point at the source
  sess=req.session;
  //console.log(req.body.project);
  //console.log('jira-miner populate "project in (' + req.body.project + ')"');
  child = exec('jira-miner populate "project in (' + req.body.project + ')"', function (error, stdout, stderr) {
    if(sess.username){
      res.render('home',{title: 'Kujira Home', message: stdout,error: stderr });
    }

  });
});

module.exports = router;