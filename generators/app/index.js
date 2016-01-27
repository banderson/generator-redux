'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _slug = require('slug');

var _slug2 = _interopRequireDefault(_slug);

var _os2 = require('os');

var _os3 = _interopRequireDefault(_os2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

var _es6Promise = require('es6-promise');

require('isomorphic-fetch');

var _yeomanGenerator = require('yeoman-generator');

function getPackageVersions(prop, packages) {
  var _this = this;

  var done = this.async();
  return _es6Promise.Promise.all(packages.map(function (pkg) {
    return new _es6Promise.Promise(function (resolve) {
      if (Array.isArray(pkg)) {
        var _pkg = _slicedToArray(pkg, 2);

        var _name = _pkg[0];
        var version = _pkg[1];

        return resolve([_name, '^' + version]);
      }
      fetch('//registry.npmjs.org/' + pkg + '/latest').then(function (response) {
        return response.json();
      }).then(function (_ref) {
        var version = _ref.version;
        return resolve([pkg, '^' + version]);
      })['catch'](function () {
        return resolve([pkg, '*']);
      });
    });
  })).then(function (deps) {
    _this.props[prop] = deps.reduce(function (memo, curr) {
      var _curr = _slicedToArray(curr, 2);

      var pkg = _curr[0];
      var version = _curr[1];

      if (pkg && version) {
        memo[pkg] = version;
      }
      return memo;
    }, {});
    done();
  })['catch'](function (e) {
    console.log('Something went wrong trying to install required modules. Try manually running `npm install` again.');
  });
}

function copy(src, dest) {
  this.fs.copyTpl(this.templatePath(src), this.destinationPath(dest), this.props);
}

exports['default'] = _yeomanGenerator.Base.extend({
  initializing: function initializing() {
    this.copy = copy.bind(this);
    this.getPackageVersions = getPackageVersions.bind(this);
  },

  prompting: function prompting() {
    var _this2 = this;

    var done = this.async();

    // Have Yeoman greet the user.
    this.log((0, _yosay2['default'])('Welcome to the pioneering ' + _chalk2['default'].red('Redux') + ' generator!'));

    var prompts = [{
      type: 'string',
      name: 'name',
      message: "What's the name of your application?",
      'default': this.destinationPath().split(_path2['default'].sep).pop()
    }, {
      type: 'string',
      name: 'description',
      message: 'Describe your application in one sentence:',
      'default': '...'
    }, {
      type: 'string',
      name: 'port',
      message: 'Which port would you like to run on?',
      'default': '3000'
    }, {
      type: 'list',
      name: 'install',
      message: 'Install dependencies?',
      choices: [{ name: 'Yes', value: true }, { name: 'No', value: false }],
      'default': true
    }];

    this.prompt(prompts, function () {
      var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _this2.props = _extends({}, props, {
        slug: (0, _slug2['default'])(props.name).toLowerCase()
      });
      done();
    });
  },

  configuring: {
    os: function os() {
      this.props.start = _os3['default'].platform === 'win32' ? 'set DEBUG=true | node server.js' : 'DEBUG=true node server.js';
    },

    deps: function deps() {
      this.getPackageVersions('deps', [['babel-core', '6.3.15'], 'es6-promise', 'whatwg-fetch', 'lodash', ['react', '0.14.0'], ['react-dom', '0.14.0'], ['redux', '3.0.4'], ['react-redux', '4.0.0'], ['redux-devtools', '2.1.5'], ['redux-thunk', '1.0.0']]);
    },

    devDeps: function devDeps() {
      this.getPackageVersions('devDeps', [['babel-core', '6.3.15'], ['babel-eslint', '5.0.0-beta4'], ['babel-loader', '6.2.0'], ['babel-preset-es2015', '6.3.13'], ['babel-preset-react', '6.3.13'], ['babel-preset-react-hmre', '1.0.0'], ['babel-preset-stage-0', '6.3.13'], ['cross-env', '1.0.6'], 'css-loader', 'cssnext-loader', ['eslint', '1.10.3'], ['eslint-plugin-babel', '3.0.0'], ['eslint-plugin-react', '3.11.3'], ['eventsource-polyfill', '0.9.6'], 'express', 'extract-text-webpack-plugin', 'path', 'style-loader', 'webpack', 'webpack-dev-middleware', 'webpack-hot-middleware']);
    }
  },

  writing: {
    app: function app() {
      this.copy('_package.json', 'package.json');
      this.copy('_npmrc', '.npmrc');
      this.copy('_gitignore', '.gitignore');
      this.copy('_editorconfig', '.editorconfig');
      this.copy('_eslintrc', '.eslintrc');
      this.copy('_babelrc', '.babelrc');
      this.copy('README.md', 'README.md');
      this.copy('webpack.config.js', 'webpack.config.js');
      this.copy('webpack.production.js', 'webpack.production.js');
      this.copy('server.js', 'server.js');
      this.copy('index.html', 'index.html');
      this.copy('js/index.js', 'js/index.js');
      this.directory('css', 'css');
      this.directory('js/actions', 'js/actions');
      this.directory('js/components', 'js/components');
      this.directory('js/constants', 'js/constants');
      this.directory('js/containers', 'js/containers');
      this.directory('js/store', 'js/store');
      this.directory('js/data', 'js/data');
      this.directory('js/reducers', 'js/reducers');
      this.directory('js/utils', 'js/utils');
    }
  },

  install: function install() {
    if (this.props.install) {
      this.installDependencies({
        npm: true,
        bower: false
      });
    }
  }

});
module.exports = exports['default'];
