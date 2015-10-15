'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var slug = require('slug');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the pioneering ' + chalk.red('Redux') + ' generator!'
    ));

    var prompts = [
      {
        type: 'string',
        name: 'name',
        message: 'What\'s the name of your application?',
        default: this.destinationPath().split(path.sep).pop()
      },
      {
        type: 'string',
        name: 'description',
        message: 'Describe your application in one sentence:',
        default: '...'
      },
      {
        type: 'string',
        name: 'port',
        message: 'Which port would you like to run on?',
        default: '3000'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.slug = slug(props.name).toLowerCase();
      done();
    }.bind(this));
  },

  configuring: {
    deps: function() {
      this.npmInstall([
        'babel-core',
        'es6-promise',
        'whatwg-fetch',
        'react',
        'react-dom',
        'redux',
        'react-redux',
        'redux-devtools',
        'redux-thunk',
        'lodash'
      ], {'save': true});
    },

    devDeps: function() {
      this.npmInstall([
        'webpack',
        'webpack-dev-server',
        'css-loader',
        'babel-core',
        'babel-loader',
        'react-hot-loader',
        'style-loader',
        'extract-text-webpack-plugin',
        'cssnext-loader'
      ], {'saveDev': true});
    }
  },

  writing: {
    app: function () {
      this._copyTpl('_package.json', 'package.json');
      this._copyTpl('_npmrc', '.npmrc');
      this._copyTpl('_gitignore', '.gitignore');
      this._copyTpl('_editorconfig', '.editorconfig');
      this._copyTpl('_eslintrc', '.eslintrc');
      this._copyTpl('_babelrc', '.babelrc');
      this._copyTpl('README.md', 'README.md');
      this._copyTpl('webpack.config.js', 'webpack.config.js');
      this._copyTpl('webpack.production.js', 'webpack.production.js');
      this._copyTpl('server.js', 'server.js');
      this._copyTpl('index.html', 'index.html');
      this._copyTpl('js/index.js', 'js/index.js');
      this.directory('css', 'css');
      this.directory('js/actions', 'js/actions');
      this.directory('js/components', 'js/components');
      this.directory('js/constants', 'js/constants');
      this.directory('js/containers', 'js/containers');
      this.directory('js/store', 'js/store');
      this.directory('js/data', 'js/data');
      this.directory('js/reducers', 'js/reducers');
      this.directory('js/utils', 'js/utils');
    },
  },

  install: function () {
    this.installDependencies({
      npm: true,
      bower: false
    });
  },

  _copyTpl: function (src, dest) {
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      this.props
    );
  }
});
