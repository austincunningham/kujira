/**
 * Created by austin on 07/05/2017.
 */
const assert = require('chai').assert;
const fixtures = require('./fixtures.json');
const kujiraService = require('./kujira-service.js');
//const user = require('./../../kujira-credentials.json');

//need to add valid jira credentials to fixtures.validUser for test to run
const user = fixtures.validUser;
const invalidUser = fixtures.invalidUser;
const project = {"project": "RAINCATCH"};
const field = fixtures.field;
const value = fixtures.value;


suite('Api Route test', function () {

  const KujiraService = new kujiraService('http://localhost:8000');

  test('post the target API', function () {
    const response1 = KujiraService.postApiTarget(user);
    assert.equal(true, (response1.indexOf('Successfully targeted JIRA') >= 0));
    const response2 = KujiraService.postApiTarget(invalidUser);
    assert.equal(false, (response2.indexOf('Successfully targeted JIRA') >= 0));
  });
  // this route will have issus with timeouts and can cause JIRA limits to be hit commenting it out of the tests
  /*test('post the populate API', function () {
    const response1 =KujiraService.postApiPopulate(project);
    assert.equal(true, (response1.indexOf('Updated and stored collection') >= 0));
    const response2 = KujiraService.postApiPopulate({"project":"invalid"});
    assert.equal(true, (response2.indexOf('Failed to connect to') >= 0));
  });*/

  test('post the query API', function(){
    const response = KujiraService.postApiQuery({field:field, value:value});
    assert.equal(true, (response.indexOf(value) >=0 ));
  });
});