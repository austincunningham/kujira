/**
 * Created by austin on 30/04/2017.
 */
'use strict';

const assert = require('chai').assert;
const fixtures = require('./fixtures.json');
const kujiraService = require('./kujira-service.js');
//const user = require('./../../kujira-credentials.json');

const invalidUser = fixtures.invalidUser;
//need to add valid JIRA credentials for test to run
const user = fixtures.validUser;

suite('Auth Login/Logout test', function () {

  const KujiraService = new kujiraService('http://localhost:8000');

  beforeEach(function () {
    KujiraService.logout();
  });

  afterEach(function () {
    KujiraService.logout();
  });

  test('test valid login', function(){
    const response = KujiraService.login(user);
    assert.equal(true, response);
  });
  test('test invalid login', function(){
    const response = KujiraService.login(invalidUser);
    assert.equal(false, response);
  });
  test('test logout', function(){
    const response1 = KujiraService.login(user);
    assert.equal(true, response1);
    const response2 = KujiraService.logout();
    assert.equal(true, response2);
  });

});