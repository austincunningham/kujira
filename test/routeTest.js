/**
 * Created by austin on 01/05/2017.
 */
'use strict';

const assert = require('chai').assert;
const fixtures = require('./fixtures.json');
const kujiraService = require('./kujira-service.js');
const user = require('./../../kujira-credentials.json');

const invalidUser = fixtures.invalidUser;
const start = fixtures.startDate;
const end = fixtures.endDate;
const sprint = fixtures.sprintName;
const invalidSprint = fixtures.invalidSprintName;
const project = fixtures.project;

suite('Route test', function () {

  const KujiraService = new kujiraService('http://localhost:8000');

  beforeEach(function () {
    KujiraService.logout();
  });

  afterEach(function () {
    KujiraService.logout();
  });
  // get route test
  test('get the welcome screen', function(){
    const response = KujiraService.getWelcome();
    assert.equal(true, (response.indexOf('Welcome to Kujira') >=0));
  });
  // get route test
  test('get the login screen', function(){
    const response = KujiraService.getLogin();
    assert.equal(true, (response.indexOf('Login to Kujira') >=0));
  });
  // get route test
  test('get the home screen', function(){
    const response1 = KujiraService.getHome();
    assert.equal(false, (response1.indexOf('Kujira Home') >=0));
    KujiraService.login(user);
    const response2 = KujiraService.getHome();
    assert.equal(true, (response2.indexOf('Kujira Home') >=0));
  });
  // get route test
  test('get the query screen', function(){
    const response1 = KujiraService.getQuery();
    assert.equal(false, (response1.indexOf('Kujira Query') >=0));
    KujiraService.login(user);
    const response2 = KujiraService.getQuery();
    assert.equal(true, (response2.indexOf('Kujira Query') >=0));
  });
  // get route test
  test('get the graph screen', function(){
    const response1 = KujiraService.getGraphs();
    assert.equal(false, (response1.indexOf('Kujira Graphs') >=0));
    KujiraService.login(user);
    const response2 = KujiraService.getGraphs();
    assert.equal(true, (response2.indexOf('Kujira Graphs') >=0));
  });
  // get route test
  test('get the Created vs Resolved screen', function(){
    const response1 = KujiraService.getCreatedResolved();
    assert.equal(false, (response1.indexOf('Kujira graphs Created Vs Resolved') >=0));
    KujiraService.login(user);
    const response2 = KujiraService.getCreatedResolved();
    assert.equal(true, (response2.indexOf('Kujira graphs Created Vs Resolved') >=0));
  });
  // get route test
  test('get the Velocity screen', function(){
    const response1 = KujiraService.getVelocity();
    assert.equal(false, (response1.indexOf('Kujira graphs Velocity') >=0));
    KujiraService.login(user);
    const response2 = KujiraService.getVelocity();
    assert.equal(true, (response2.indexOf('Kujira graphs Velocity') >=0));
  });
  // get route test
  test('get the Average Age screen', function(){
    const response1 = KujiraService.getAverageAge();
    assert.equal(false, (response1.indexOf('Kujira graphs Average Age') >=0));
    KujiraService.login(user);
    const response2 = KujiraService.getAverageAge();
    assert.equal(true, (response2.indexOf('Kujira graphs Average Age') >=0));
  });
  // get route test
  test('get the Burndown screen', function(){
    const response1 = KujiraService.getBurndown();
    assert.equal(false, (response1.indexOf('Kujira graphs Burndown') >=0));
    KujiraService.login(user);
    const response2 = KujiraService.getBurndown();
    assert.equal(true, (response2.indexOf('Kujira graphs Burndown') >=0));
  });
  //test post valid sprint name, invalid sprint name and undefined
  test('post the Burndown', function(){
    KujiraService.login(user);
    const response1 = KujiraService.postBurndown({sprint: sprint});
    assert.equal(true, (response1.indexOf('Success found '+ sprint ) >=0));
    const response2 = KujiraService.postBurndown({sprint: invalidSprint});
    assert.equal(true, (response2.indexOf('No such Sprint named '+invalidSprint)>=0));
    const response3 = KujiraService.postBurndown({sprint: undefined});
    assert.equal(true, (response3.indexOf('No such Sprint named ')>=0));
  });
  //test post valid date range , invalid and undefined
  test('post the Created vs Resolved',function () {
    KujiraService.login(user);
    const response1 = KujiraService.postCreatedResolved({start: start, end:end });
    assert.equal(true, (response1.indexOf('Success valid date range ' +start +' to '+ end) >=0 ));
    const response2 = KujiraService.postCreatedResolved({start: "stiring", end:"string" });
    assert.equal(true, (response2.indexOf('Invalid date range') >=0 ));
    const response3 = KujiraService.postCreatedResolved({start: undefined, end: undefined });
    assert.equal(true, (response3.indexOf('Invalid date range') >=0 ));
  });
  //test post valid date range , invalid and undefined
  test('post the Average age', function(){
    KujiraService.login(user);
    const response1 = KujiraService.postAverageage({start: start, end:end });
    assert.equal(true, (response1.indexOf('Success valid date range ' +start +' to '+ end) >=0 ));
    const response2 = KujiraService.postAverageage({start: "stiring", end:"string" });
    assert.equal(true, (response2.indexOf('Invalid date range') >=0 ));
    const response3 = KujiraService.postAverageage({start: undefined, end: undefined });
    assert.equal(true, (response3.indexOf('Invalid date range') >=0 ));
  });
  //may have timeout issues with this test
  //test post project from the home page
  test('post from the home page', function(){
    KujiraService.login(user);
    const response1 = KujiraService.postHome({project: invalidSprint});
    assert.equal(true, (response1.indexOf('Failed to connect to ' + invalidSprint + ' project') >=0 ));
    const response2 = KujiraService.postHome({project: project});
    assert.equal(true, (response2.indexOf('Connected to ' + project + ' project') >=0 ));
    const response3 = KujiraService.postHome({project: undefined});
    assert.equal(true, (response3.indexOf('Failed to connect to ') >=0 ));
  });

  test('post allQuery from query page', function(){
    KujiraService.login(user);
    const response1 = KujiraService.postAllQuery();
    assert.equal(true, (response1.indexOf('Kujira Query All') >=0 ));
  });

  test('post clear')


});