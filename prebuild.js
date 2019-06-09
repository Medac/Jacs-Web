#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const git = require('git-rev-sync');

const environmentFilesDirectory = path.join(__dirname, './src/environments');
const targetEnvironmentTemplateFileName = 'environment.template.ts';

const environment = process.env.ENV || 'dev';
const targetEnvironmentFileName = 'environment.ts';

// Define default values in case there are no defined ones,
// but you should define only non-crucial values here,
// because build should fail if you don't provide the correct values
// for your production environment
let defaultEnvValues = {
  PRODUCTION: '',
  SERVER_URL: null,
  ERROR_TRACKING_ENV: 'dev',
  APPLICATION_VERSION: git.long() || '1.0.0',
  GOOGLE_MAPS_KEY: '',
  DOMAIN: 'localhost'
};

let env = {
  dev: {
    PRODUCTION: false,
    SERVER_URL: 'http://localhost:3000/',
    DOMAIN: 'localhost'
  },
  prod: {
    PRODUCTION: true,
    SERVER_URL: 'https://api.neworleansexperience.com/',
    ERROR_TRACKING_ENV: 'production',
    DOMAIN: 'neworleansexperience.com'
  }
};

// Load template file
const environmentTemplate = fs.readFileSync(
  path.join(environmentFilesDirectory, targetEnvironmentTemplateFileName),
  {encoding: 'utf-8'}
);

// Strip nulls -- We don't want to change these
// defaultEnvValues = Object.keys(defaultEnvValues).forEach(key => {
//   defaultEnvValues[key] == null && delete defaultEnvValues[key];
// });

// Generate output data
const output = ejs.render(environmentTemplate, Object.assign({}, defaultEnvValues, env[environment], process.env));
console.log('Built Environment File: ' + path.join(environmentFilesDirectory, targetEnvironmentFileName));
// Write environment file
fs.writeFileSync(path.join(environmentFilesDirectory, targetEnvironmentFileName), output);

process.exit(0);
