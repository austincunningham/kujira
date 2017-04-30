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

  setAuth(url, user) {
    const res = request('POST', this.baseUrl + url, {json: user});
    //will return 200/2xx even if fails as not using standard http auth
    if(res.title === 'Kujira Home'){
      return true;

    }
    return false;
  }

  clearAuth() {
    //sess = null;
  }

  get(url) {
    var returnedObj = null;
    var res = request('GET', this.baseUrl + url, { headers: this.authHeadder });
    if (res.statusCode < 300) {
      returnedObj = JSON.parse(res.getBody('utf8'));
    }

    return returnedObj;
  }

  post(url, obj) {
    var returnedObj = null;
    var res = request('POST', this.baseUrl + url, { json: obj, headers: this.authHeadder });
    if (res.statusCode < 300) {
      returnedObj = JSON.parse(res.getBody('utf8'));
    }

    return returnedObj;
  }

}

module.exports = SyncHttpService;