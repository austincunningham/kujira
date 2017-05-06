/**
 * Created by austin on 02/04/2017.
 */

'use strict';

const express = require('express');
const router = express.Router();
const fields = require('../fixtures/fields.json');
const exec = require('child_process').exec;
const session = require('express-session');
const Handlebars = require('handlebars');
const kujiraDataMiner = require('kujira-data-miner');
const fs = require('fs');

let child;
let sess;
let searchString = ' ';
let message = {};
let sprintDropDown = {};

//jira-miner target takes json input url,username and password
// open route welcome screen
router.get('/', function (req, res) {
  sess = req.session;
  res.render('index',{title: 'Welcome to Kujira'});
});

// open route login
router.get('/login', function(req, res){
  res.render('login',{
    title: 'Login to Kujira'
  });
});


//this renders the report page
router.get('/reports', function(req,res){
  let burndown;
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    child = exec('jira-miner query search.js --json',{maxBuffer: 1024 * 20000}, function (error, stdout, stderr) {
      console.log(stdout, error, stderr);

      if(error){
        res.render('reports', {
          title: 'Kujira Reports Error',
          error: stderr,
          fields: fields
        });
      } else {
        stdout = JSON.parse(stdout);
        message = stdout;
        sprintDropDown = kujiraDataMiner.sprintInfo(message);
        res.render('reports', {
          title: 'Kujira Reports',
          message: message,
          error: stderr,
          fields: fields,
          sprintDropDown: sprintDropDown,
          burndown: burndown
        });
      }
    });
  }
});

// post sprint name to change the data going to the graph
router.post('/reports', function(req, res){
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    let burndown;
    let error = '';
    //wasn't failing gracefully when typo in sprint name try catch to handel it.
    try {
      burndown = kujiraDataMiner.burndownReportData(message, req.body.sprintName);
      error = 'Success found '+req.body.sprintName;
    }catch(err){
      error = 'No such Sprint named '+req.body.sprintName;
    }
    fs.writeFile('./public/js/burndown.json',  JSON.stringify(burndown, null, 4), function(err){
      if(err){
        console.log(err);
      }else {
        console.log('Success');
      }
    });
    res.render('reports', {
      title: 'Kujira Report Burndown',
      fields: fields,
      message: message,
      error: error,
      sprintDropDown: sprintDropDown,
      burndown: burndown
    });
  }
});



//this renders burndown on load
router.get('/graphs', function(req, res){
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    child = exec('jira-miner query search.js --json',{maxBuffer: 1024 * 20000}, function (error, stdout, stderr) {
      console.log(stdout, error, stderr);

      if(error){
        res.render('graphs', {
          title: 'Kujira Graphs Error',
          error: stderr,
          fields: fields
        });
      } else {
        stdout = JSON.parse(stdout);
        message = stdout;
        sprintDropDown = kujiraDataMiner.sprintInfo(message);
        res.render('graphs', {
          title: 'Kujira Graphs',
          message: message,
          error: stderr,
          fields: fields,
          sprintDropDown: sprintDropDown
        });
      }
    });
  }
});

//render avearage age page populates with the existing json data
router.get('/burndown', function(req, res){
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    res.render('graphs', {
      title: 'Kujira graphs Burndown',
      fields: fields,
      message: message,
      sprintDropDown: sprintDropDown
    });
  }
});

// post sprint name to change the data going to the graph
router.post('/burndown', function(req, res){
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    let burndown;
    let error;
    //wasn't failing gracefully when typo in sprint name try catch to handel it.
    try {
      burndown = kujiraDataMiner.burndownReportData(message, req.body.sprintName);
      error = 'Success found '+req.body.sprintName;
    }catch(err){
      error = 'No such Sprint named '+req.body.sprintName;
    }
    fs.writeFile('./public/js/burndown.json',  JSON.stringify(burndown, null, 4), function(err){
      if(err){
        console.log(err);
      }else {
        console.log('Success');
      }
    });
    res.render('graphs', {
      title: 'Kujira graphs Burndown',
      fields: fields,
      message: message,
      error: error,
      sprintDropDown: sprintDropDown
    });
  }
});

//render avearage age page populates with the existing json data
router.get('/averageage', function(req, res){
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    res.render('averageage', {
      title: 'Kujira graphs Average Age',
      fields: fields,
      message: message
    });
  }
});

//post passes start and end dates to render fresh graph
router.post('/averageage', function(req, res){
  let averageage;
  let error;
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    try {
      const start = new Date(req.body.start).toISOString().slice(0, 10);
      const end = new Date(req.body.end).toISOString().slice(0, 10);
      averageage = kujiraDataMiner.averageAge(message, start, end);
      error = 'Success valid date range ' +req.body.start +' to '+req.body.end;
    } catch(err) {
      error = 'Invalid date range'
    }
    fs.writeFile('./public/js/averageage.json',  JSON.stringify(averageage, null, 4), function(err){
      if(err){
        console.log(err);
      }else {
        console.log('Success');
      }
    });
    res.render('averageage', {
      title: 'Kujira graphs Average Age',
      fields: fields,
      message: message,
      error: error
    });
  }
});


// message is a global variable that is populated by /query or /allQuery
router.get('/velocity', function(req, res){
  let velocity;
  let error;
  //change the message to velocity data with kujira-data-miner npm
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    try {
      velocity = kujiraDataMiner.velocity(message);
      error = 'Velocity Data';
    } catch(err){
      error = 'No Graphing data available';
    }
    //create a new file
    fs.writeFile('./public/js/velocity.json', JSON.stringify(velocity, null, 4), function(err){
      if(err){
        console.log(err);
      }else {
        console.log('Success');
      }
    });
    res.render('velocity', {
      title: 'Kujira graphs Velocity',
      fields: fields,
      message: message,
      error: error
    });
  }
});

//renders createResolved page
router.get('/createdResolved', function(req, res){
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    res.render('createdResolved', {
      title: 'Kujira graphs Created Vs Resolved',
      fields: fields,
      message: message
    });
  }
});

//posts start and end date to re render graph create vs resolved
router.post('/createdResolved', function(req, res){
  let createresolved;
  let error;
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    try {
      const start = new Date(req.body.start).toISOString().slice(0, 10);
      const end = new Date(req.body.end).toISOString().slice(0, 10);
      createresolved = kujiraDataMiner.createdResolved(message, start, end);
      error = 'Success valid date range ' +req.body.start +' to '+req.body.end;
    } catch(err) {
      error = 'Invalid date range'
    }
    fs.writeFile('./public/js/createdResolved.json',  JSON.stringify(createresolved, null, 4), function(err){
      if(err){
        console.log(err);
      }else {
        console.log('Success');
      }
    });

    res.render('createdResolved', {
      title: 'Kujira graphs Created Vs Resolved',
      fields: fields,
      message: message,
      error: error
    });
  }
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
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    res.render('home',{title: 'Kujira Home'});
  }
});

// /query check session username and allow access, cookie invalid deny access
router.get('/query', function (req, res) {
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    res.render('query',{title: 'Kujira Query',fields: fields});
  }

});

// /login if successful applies the current username to the cookie
router.post('/login', function(req, res){
  child = exec('jira-miner target https://' + req.body.url + ' --user ' + req.body.username +
      ' --password ' + req.body.password,{maxBuffer: 1024 * 20000}, function (error, stdout, stderr) {
    if (stdout.indexOf('Successfully targeted JIRA') >= 0 ){
      sess = req.session;
      sess.username = req.body.username;
      res.render('home',{title:'Kujira Home'});
    }else{
      res.render('login',{title:'Login to Kujira', error: error, stderr: stderr});
    }
  });
});

// /home post project
router.post('/home', function(req, res){
// execute jira-miner target to point at the source
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    child = exec('jira-miner populate "project in (' + req.body.project + ')"', {maxBuffer: 1024 * 20000}, function (error, stdout, stderr) {
      console.log(stdout);
      if (stdout.indexOf('Updated and stored collection') >= 0) {
        message = 'Connected to ' + req.body.project + ' project';
      } else {
        message = 'Failed to connect to ' + req.body.project + ' project' + stderr;
      }
      res.render('home', {title: 'Kujira Home', message: message});
    });
  }
});

// /home post project
router.post('/query', function(req, res){
// execute jira-miner target to point at the source
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    if (searchString.indexOf(req.body.value) >= 0) {
      console.log('do nothing');
    } else {
      searchString += '--' + req.body.field + '=' + req.body.value + ' ';
    }
    child = exec('jira-miner query search.js ' + searchString + ' --json', {maxBuffer: 1024 * 20000}, function (error, stdout, stderr) {
      console.log(stdout, error, stderr);
      message = stdout;
      if (error) {
        res.render('query', {
          title: 'Kujira Query Error',
          error: stderr,
          search: searchString,
          fields: fields
        });
      } else {
        stdout = JSON.parse(stdout);
        res.render('query', {
          title: 'Kujira Query Results',
          message: stdout,
          error: stderr,
          search: searchString,
          fields: fields
        });
      }
    });
  }
});


//Clear the search on the query page
router.post('/clearQuery', function(req, res){
  searchString = '';
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    res.render('query',{
      title: 'Kujira Query Clear',
      fields: fields,
      search: searchString
    });
  }
});

//Find all project data on query page
router.post('/allQuery', function(req, res){
  if(!sess || !sess.username){
    res.redirect('/');
  } else {
    child = exec('jira-miner query search.js --json', {maxBuffer: 1024 * 20000}, function (error, stdout, stderr) {
      console.log(stdout, error, stderr);

      if (error) {
        res.render('query', {
          title: 'Kujira Query Error',
          error: stderr,
          search: searchString,
          fields: fields
        });
      } else {
        stdout = JSON.parse(stdout);
        message = stdout;
        res.render('query', {
          title: 'Kujira Query All',
          message: stdout,
          error: stderr,
          search: searchString,
          fields: fields
        });
      }
    });
  }
});


module.exports = router;