'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the pioneering ' + chalk.red('Redux') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  configuring: {
    libraries: function() {
      this.npmInstall([
        'react', 'react-redux', 'redux-devtools',
        'redux-thunk', 'lodash'
      ], {'save': true });
    },

    buildTools: function() {
      this.npmInstall([
        'webpack', 'webpack-dev-server', 'css-loader',
        'babel-core', 'babel-loader', 'react-hot-loader'
      ], {'saveDev': true });
    },

    polyfills: function() {
      this.npmInstall([
        'babel-runtime'//, 'es6-promise', 'whatwg-fetch'
      ], {'save': true });
    }
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      this.fs.copy(
        this.templatePath('babelrc'),
        this.destinationPath('.babelrc')
      );
      this._copyTpl('webpack.config.js', 'webpack.config.js');
      this._copyTpl('server.js', 'server.js');
      this._copyTpl('index.html', 'index.html');
      this._copyTpl('js/index.js', 'js/index.js');
      this.directory('css', 'css');
      this.directory('js/actions', 'js/actions');
      this.directory('js/components', 'js/components');
      this.directory('js/constants', 'js/constants');
      this.directory('js/containers', 'js/containers');
      this.directory('js/data', 'js/data');
      this.directory('js/reducers', 'js/reducers');
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  },

  _copyTpl: function (src, dest) {
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      this.props
    );
  }
});
