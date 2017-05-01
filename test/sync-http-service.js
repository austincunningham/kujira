/**
 * Created by austin on 30/04/2017.
 */
var request = require('sync-request');
const session = require('express-session');

let sess;

class SyncHttpService {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  //checking if the page has 'Kujira Home' for successful login
  setAuth(url, user) {
    const res = request('POST', this.baseUrl + url, {json: user});
    //will return 200/2xx even if fails as not using standard http auth
    if (res.body.indexOf('Kujira Home') >= 0 ) {
      return true;

    }
    return false;
  }

  //checking if the page has 'Welcome to Kujira' for successful logout
  clearAuth(url) {
    const res = request('GET', this.baseUrl + url);
    if(res.body.indexOf('Welcome to Kujira') >=0){
      return true;
    }
  }
  //not used yet
  get(url) {
    var returnedObj = null;
    var res = request('GET', this.baseUrl + url);
    if (res.statusCode < 300) {
      returnedObj = res.body;
    }

    return returnedObj;
  }

  post(url, obj) {
    var returnedObj = null;
    var res = request('POST', this.baseUrl + url, { json: obj });
    if (res.statusCode < 300) {
      returnedObj = res.body;
    }

    return returnedObj;
  }

}

module.exports = SyncHttpService;