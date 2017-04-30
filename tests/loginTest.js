/**
 * Created by austin on 30/04/2017.
 */
'use strict';

const assert = require('chai').assert;
//const fixtures = require('./fixtures.json');
const kujiraService = require('./kujira-service.js');
const user = require('./../../kujira-credentials.json');

suite('Auth Login test', function () {

  const KujiraService = new kujiraService('http://localhost:8000');

  beforeEach(function () {

  });

  afterEach(function () {

  });

  test('this is just some writing', function(){
    console.log('test');
  });


});