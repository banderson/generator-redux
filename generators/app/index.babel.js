import path from 'path';
import slug from 'slug';
import os from 'os';
import chalk from 'chalk';
import yosay from 'yosay';
import {Promise} from 'es6-promise';
import 'isomorphic-fetch';
import {Base} from 'yeoman-generator';

function getPackageVersions(prop, packages) {
  const done = this.async();
  return Promise
    .all(packages.map(pkg => {
      return new Promise(resolve => {
        if (Array.isArray(pkg)) {
          const [name, version] = pkg;
          return resolve([name, `^${version}`]);
        }
        fetch(`//registry.npmjs.org/${pkg}/latest`)
          .then(response => response.json())
          .then(({version}) => resolve([pkg, `^${version}`]))
          .catch(() => resolve([pkg, '*']));
      });
    }))
    .then(deps => {
      this.props[prop] = deps.reduce((memo, curr) => {
        const [pkg, version] = curr;
        if (pkg && version) {
          memo[pkg] = version;
        }
        return memo;
      }, {});
      done();
    }).catch(e => {
      console.log('Something went wrong trying to install required modules. Try manually running `npm install` again.');
    });
}

function copy(src, dest) {
  this.fs.copyTpl(
    this.templatePath(src),
    this.destinationPath(dest),
    this.props
  );
}

export default Base.extend({
  initializing() {
    this.copy = copy.bind(this);
    this.getPackageVersions = getPackageVersions.bind(this);
  },

  prompting() {
    const done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the pioneering ${chalk.red('Redux')} generator!`
    ));

    const prompts = [
      {
        type: 'string',
        name: 'name',
        message: "What's the name of your application?",
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
      },
      {
        type: 'list',
        name: 'install',
        message: 'Install dependencies?',
        choices: [
          {name: 'Yes', value: true},
          {name: 'No', value: false}
        ],
        default: true
      }
    ];

    this.prompt(prompts, (props = {}) => {
      this.props = {
        ...props,
        slug: slug(props.name).toLowerCase()
      };
      done();
    });
  },

  configuring: {
    os() {
      this.props.start = os.platform === 'win32'
        ? 'set DEBUG=true | node server.js'
        : 'DEBUG=true node server.js';
    },

    deps() {
      this.getPackageVersions(
        'deps',
        [
          ['babel-core', '6.3.15'],
          'es6-promise',
          'whatwg-fetch',
          'lodash',
          ['react', '0.14.0'],
          ['react-dom', '0.14.0'],
          ['redux', '3.0.4'],
          ['react-redux', '4.0.0'],
          ['react-router', '2.0.1'],
          ['react-router-redux', '4.0.0'],
          ['redux-devtools', '2.1.5'],
          ['redux-thunk', '1.0.0']
        ]
      );
    },

    devDeps() {
      this.getPackageVersions(
        'devDeps',
        [
          ['babel-core', '6.3.15'],
          ['babel-eslint', '5.0.0-beta4'],
          ['babel-loader', '6.2.0'],
          ['babel-preset-es2015', '6.3.13'],
          ['babel-preset-react', '6.3.13'],
          ['babel-preset-react-hmre', '1.0.0'],
          ['babel-preset-stage-0', '6.3.13'],
          ['cross-env', '1.0.6'],
          'css-loader',
          'cssnext-loader',
          ['eslint', '1.10.3'],
          ['eslint-plugin-babel', '3.0.0'],
          ['eslint-plugin-react', '3.11.3'],
          ['eventsource-polyfill', '0.9.6'],
          'express',
          'extract-text-webpack-plugin',
          'path',
          'style-loader',
          ['webpack', '1.0.0'],
          'webpack-dev-middleware',
          'webpack-hot-middleware'
        ]
      );
    }
  },

  writing: {
    app() {
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
    },
  },

  install() {
    if (this.props.install) {
      this.installDependencies({
        npm: true,
        bower: false
      });
    }
  }

});
