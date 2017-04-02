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
  res.render('index');
});

module.exports = router;