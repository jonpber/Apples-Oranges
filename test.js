var Nightmare = require('nightmare');
var expect = require('chai').expect;

describe('test create a debate button', function (){
  var nightmare = Nightmare ();
  nightmare
    .goto  // heroku livepage
    .click // ('create a debate button')
    .wait // for last element ID to load
    .type // bigfoot vs loch ness monster
})
