'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('redux:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ someOption: true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      'index.html'
    ]);
  });

  it('create proper configStore file', function() {
    var store = './js/store/configureStore.js';
    assert.file(store);
    assert.fileContent(store, "import {createStore, applyMiddleware, combineReducers, compose} from 'redux';");
    assert.fileContent(store, "if (__DEV__) {");
    assert.fileContent(store, "createStoreWithMiddleware = compose(");
    assert.fileContent(store, "applyMiddleware(thunkMiddleware),");
    assert.fileContent(store, "devTools()");
    assert.fileContent(store, "persistState(window.location.href.match(/[?&]debug_session=([^&]+)\\b/))");
    assert.fileContent(store, ")(createStore);");
  });
});
