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

  getHome() {
    return this.httpService.get('/home');
  }

  getQuery() {
    return this.httpService.get('/query');
  }
  
  getGraphs() {
    return this.httpService.get('/graphs');
  }

  getCreatedResolved (){
    return this.httpService.get('/createdResolved');
  }

  getVelocity() {
    return this.httpService.get('/velocity');
  }

  getAverageAge() {
    return this.httpService.get('/averageage');
  }
  
  getBurndown() {
    return this.httpService.get('/burndown');
  }

  postBurndown(obj){
    return this.httpService.post('/burndown', obj);
  }

  postCreatedResolved(obj){
    return this.httpService.post('/createdResolved', obj);
  }

  postAverageage(obj){
    return this.httpService.post('/averageage', obj);
  }
  postHome(obj){
    return this.httpService.post('/home',obj);
  }
  postAllQuery(obj){
  return this.httpService.post('/allQuery', obj);
  }
  postQuery(obj){
    return this.httpService.post('/query', obj);
  }
  postClearQuery(){
    return this.httpService.post('/clearQuery');
  }

}

module.exports = kujiraService;
