## Redux and Redux-devtools CLI

> CLI for Redux: next-gen functional Flux/React with devtools. This is intended to be the successor to my existing [generator-flux](https://github.com/banderson/generator-flux-react) that was based on vanilla FB flux.


## Getting Started

### What is [Redux](https://github.com/gaearon/redux)?

It's ["Atomic Flux with hot reloading"](http://youtube.com/watch?v=xsSnOQynTHs), a next-generation take on the [Flux pattern](http://facebook.github.io/flux/) with a few core [philosophical design differences](https://github.com/gaearon/redux#philosophy--design-goals), including:

> * Preserves the benefits of Flux, but adds other nice properties thanks to its functional nature.
> * Prevents some of the anti-patterns common in Flux code.
> * Works great in universal (aka "isomorphic") apps because it doesn't use singletons and the data can be rehydrated.
...


### Features include in this Generator:
- [x] Redux functional application architecture
- [x] [Redux-DevTools](https://github.com/gaearon/redux-devtools) configured and enabled when in dev mode
- [x] [WebPack](http://webpack.github.io/) for build pipeline and dev server awesomeness
- [x] [Babel](https://babeljs.io/) transpiler so you can use [bleeding edge language features](https://babeljs.io/docs/usage/experimental/)
- [x] PostCSS preprocessor with autoprefixer support

#### Coming soon:
- [ ] React-router
- [ ] Choice of UI Framework (Material UI, Elemental UI, React-Bootstrap?)
- [ ] Storage options: `localStorage` and Firebase/Parse to start
- [ ] Test scaffolding for actions, stores, and react components

### Prerequisites

You must have [Node.js w/NPM](http://nodejs.org/) installed. I recommend installing via [homebrew](http://brew.sh/), but you should be able to use the [pre-built installers](http://nodejs.org/download/) if you prefer.

Also, `generator-redux` is a [Yeoman](http://yeoman.io/) generator. If you do not have Yeoman installed, first run:

```bash
$ npm install -g yo
```

### Installing the generator

To install generator-redux from npm, run:

```bash
$ npm install -g generator-redux
```

Finally, initiate the generator:

```bash
$ yo redux
```


### Configuration Options

During install-time, you will be prompted to enter some information to help create the project structure and `package.json` file:

* __Application name__ (_string_): A human-readable name for your project, i.e. "My Redux Application"
* __Application Description__ (_string_): Describe your application in one sentence, to be used in `package.json` and the generated `README.md`
* __Port__ (number): choose a port to run your development server on (defaults to :**3000**)


### Running your scaffolded project

The generated project includes a hot-reloading static server. To start the server, run:

```bash
$ npm start
```

To run the server with the dev-tools enabled, run:

```bash
$ DEBUG=true npm start
```

To build for production, run:

```bash
$ npm run build
```


## License

MIT
