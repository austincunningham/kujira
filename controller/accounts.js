/**
 * Created by austin on 02/04/2017.
 */

'use strict';

const express = require('express');
const router = express.Router();
const fields = require('../fixtures/fields.json');
const exec = require('child_process').exec;
const session = require('express-session');
let child;
let sess;
let searchString = ' ';

//jira-miner target takes json input url,username and password
// open route welcome screen
router.get('/', function (req, res) {
  sess = req.session;
  sess.username;
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
      res.redirect('/');
    }
  });
});

// /home check session username and allow access, cookie invalid deny access
router.get('/home', function (req, res) {
  let searchString = ' ';
  if(sess.username){
    res.render('home',{title: 'Kujira Home'});
  } else {
    res.render('index',{title:'Welcome to Kujira'})
  }
});

// /query check session username and allow access, cookie invalid deny access
router.get('/query', function (req, res) {
  if(sess.username){
    res.render('query',{title: 'Kujira Query',fields: fields});
  } else {
    res.render('index',{title:'Welcome to Kujira'})
  }

});

// /login if successful applies the current username to the cookie
router.post('/login', function(req, res){
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
  child = exec('jira-miner populate "project in (' + req.body.project + ')"', function (error, stdout, stderr) {
    console.log(stdout);
    let message;
    if(stdout.indexOf('Updated and stored collection') >= 0 ){
      message = 'Connected to '+ req.body.project +' project';
    }else{
      message = 'Failed to connect to '+req.body.project +' project';
    }
    res.render('home',{title: 'Kujira Home', message:message});
  });
});

// /home post project
router.post('/query', function(req, res){
// execute jira-miner target to point at the source
  searchString += '--'+ req.body.field +'='+ req.body.value +' ';
  child = exec('jira-miner query search.js ' + searchString +' --json', function (error, stdout, stderr) {
    console.log(stdout, error, stderr);
    //stdout = JSON.stringify(stdout);

    //stderr = JSON.stringify(stderr);
    if(error){
      res.render('query', {
        title: 'Kujira Query Error',
        error: stderr,
        search: searchString,
        fields: fields
      });
    } else {
      stdout = JSON.parse(stdout);
      res.render('query', {
        title: 'Kujira Query',
        message: stdout,
        error: stderr,
        search: searchString,
        fields: fields
      });
    }
  });
});

module.exports = router;