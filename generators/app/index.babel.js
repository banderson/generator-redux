import 'isomorphic-fetch';
import path from 'path';
import slug from 'slug';
import chalk from 'chalk';
import yosay from 'yosay';
import {Promise} from 'es6-promise';
import {Base} from 'yeoman-generator';

function getPackageVersions(prop, packages) {
  const done = this.async();
  return Promise
    .all(packages.map(pkg => {
      return new Promise(resolve => {
        fetch(`//registry.npmjs.org/${pkg}/latest`)
          .then(response => response.json())
          .then(({version}) => resolve(`${pkg}: ^${version}`))
          .catch(() => resolve(`${pkg}: *`));
      });
    }))
    .then(deps => {
      this.props[prop] = deps.filter(dep => dep);
      done();
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
  init() {
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
    deps() {
      this.getPackageVersions(
        'deps',
        [
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
        ]
      );
    },

    devDeps() {
      this.getPackageVersions(
        'devDeps',
        [
          'webpack',
          'webpack-dev-server',
          'css-loader',
          'babel-core',
          'babel-loader',
          'react-hot-loader',
          'style-loader',
          'extract-text-webpack-plugin',
          'cssnext-loader'
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

