/**
 * Created by austin on 30/04/2017.
 */
/**
 * Created by austin on 13/11/2016.
 */
'use strict';

const SyncHttpService = require('./sync-http-service');
const baseUrl = 'http://localhost:8000';

class kujiraService {

  constructor(baseUrl) {
    this.httpService = new SyncHttpService(baseUrl);
  }

  getWelcome() {
    return this.httpService.get('/');
  }

  getLogin() {
    return this.httpService.get('/login');
  }

  login(user) {
    return this.httpService.setAuth('/login', user);
  }

  logout() {
    return this.httpService.clearAuth('/');
  }

}

module.exports = kujiraService;
