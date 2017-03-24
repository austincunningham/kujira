/**
 * Created by acunningham on 20/03/17.
 */
'use strict';
var prompt = require('prompt');
var colors = require("colors/safe");

var target = require('./target.js');
var populate = require('./populate.js');

//var query = require('./query.js');


//target().then(populate();
if(target()){
  console.log('do i ever get here');
  try {
    console.log('do I ever get here?');
    populate();
  } catch (e){
      console.log(error);
  }
}
//query();