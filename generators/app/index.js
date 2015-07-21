'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var slug = require('slug');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the pioneering ' + chalk.red('Redux') + ' generator!'
    ));

    var prompts = [{
      type: 'string',
      name: 'appName',
      message: 'What\'s the name of your application?',
      default: "My Redux App"
    }, {
      type: 'string',
      name: 'appDesc',
      message: 'Describe your application in one sentence:',
      default: '...'
    },{
      type: 'string',
      name: 'port',
      message: 'Which port would you like to run on?',
      default: '3000'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.appSlug = slug(props.appName).toLowerCase();
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
        'webpack', 'webpack-dev-server', 'css-loader', 'jsx-loader',
        'babel-core', 'babel-loader', 'react-hot-loader', 'style-loader'
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
      this._copyTpl('_package.json' ,'package.json');
      this._copyTpl('_bower.json', 'bower.json');
      this.fs.copy(
        this.templatePath('babelrc'),
        this.destinationPath('.babelrc')
      );
      this._copyTpl('README.md' ,'README.md');
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
