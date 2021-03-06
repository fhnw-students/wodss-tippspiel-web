# wodss-tippspiel-web [![Build Status](https://travis-ci.org/fhnw-students/wodss-tippspiel-web.svg?branch=develop)](https://travis-ci.org/fhnw-students/wodss-tippspiel-web) [![Build Status](https://travis-ci.org/fhnw-students/wodss-tippspiel-web.svg?branch=master)](https://travis-ci.org/fhnw-students/wodss-tippspiel-web)

## Getting started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

Install [Yarn](https://yarnpkg.com/en/docs/install)

- on OSX use [homebrew](http://brew.sh) `brew install yarn`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install yarn`

### Step 2: Install project dependencies

From the project folder, execute the following commands:

```shell
yarn install
```

### Step 3: Start local web-server

This will install all required dependencies, including a local version of Webpack that is going to
build and bundle the app. There is no need to install Webpack globally.

To run the app execute the following command:

```shell
yarn serve
```

This command starts the webpack development server that serves the build bundles.
You can now browse the skeleton app at `http://localhost:8080` (or the next available port, notice the output of the command). Changes in the code
will automatically build and reload the app.

## Deployment

First increase your version number in the `package.json` file. Next we have to build the app with `yarn build`. This creates a new `dist` folder with our awesome app. Afterwards, commit and push your changes to the `develop` branch. [Travis](travis-ci.org) our CI will automatically test your changes, and [Heroku](https://www.heroku.com/) our Cloud Application Platform will deploy your App later.

You can visit the builded app [here](https://wodss-tippspiel-web.herokuapp.com)
