/**
 * Created by austin on 01/05/2017.
 */
'use strict';

const assert = require('chai').assert;
const fixtures = require('./fixtures.json');
const kujiraService = require('./kujira-service.js');
const user = require('./../../kujira-credentials.json');

const invalidUser = fixtures.invalidUser;

suite('Route test', function () {

  const KujiraService = new kujiraService('http://localhost:8000');

  beforeEach(function () {
    KujiraService.logout();
  });

  afterEach(function () {
    KujiraService.logout();
  });

  test('get the welcome screen', function(){
    const response = KujiraService.getWelcome();
    assert.equal(true, (response.indexOf('Welcome to Kujira') >=0));
  });

  test('get the login screen', function(){
    const response = KujiraService.getLogin();
    assert.equal(true, (response.indexOf('Login to Kujira') >=0));
  });

  test('get the home screen', function(){
    const response1 = KujiraService.getHome();
    assert.equal(false, (response1.indexOf('Kujira Home') >=0));
    KujiraService.login(user);
    const response2 = KujiraService.getHome();
    assert.equal(true, (response2.indexOf('Kujira Home') >=0));
  });

  test('get the query screen', function(){
    const response1 = KujiraService.getQuery();
    assert.equal(false, (response1.indexOf('Kujira Query') >=0));
    KujiraService.login(user);
    const response2 = KujiraService.getQuery();
    assert.equal(true, (response2.indexOf('Kujira Query') >=0));
  });

  test('get the graph screen', function(){
    const response1 = KujiraService.getGraphs();
    assert.equal(false, (response1.indexOf('Kujira Graphs') >=0));
    KujiraService.login(user);
    const response2 = KujiraService.getGraphs();
    assert.equal(true, (response2.indexOf('Kujira Graphs') >=0));
  });

  test('get the Created vs Resolved screen', function(){
    const response1 = KujiraService.getCreatedResolved();
    assert.equal(false, (response1.indexOf('Kujira graphs Created Vs Resolved') >=0));
    KujiraService.login(user);
    const response2 = KujiraService.getCreatedResolved();
    assert.equal(true, (response2.indexOf('Kujira graphs Created Vs Resolved') >=0));
  });

  test('get the Velocity screen', function(){
    const response1 = KujiraService.getVelocity();
    assert.equal(false, (response1.indexOf('Kujira graphs Velocity') >=0));
    KujiraService.login(user);
    const response2 = KujiraService.getVelocity();
    assert.equal(true, (response2.indexOf('Kujira graphs Velocity') >=0));
  });

  test('get the Average Age screen', function(){
    const response1 = KujiraService.getAverageAge();
    assert.equal(false, (response1.indexOf('Kujira graphs Average Age') >=0));
    KujiraService.login(user);
    const response2 = KujiraService.getAverageAge();
    assert.equal(true, (response2.indexOf('Kujira graphs Average Age') >=0));
  });

  test('get the Burndown screen', function(){
    const response1 = KujiraService.getBurndown();
    assert.equal(false, (response1.indexOf('Kujira graphs Burndown') >=0));
    KujiraService.login(user);
    const response2 = KujiraService.getBurndown();
    assert.equal(true, (response2.indexOf('Kujira graphs Burndown') >=0));
  });

  
});