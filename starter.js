#!/usr/bin/env node

const { execSync } = require('child_process');
const { join } = require('path');
const { copySync } = require('fs-extra');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

const projectPath = join(process.cwd(), projectName);

// Clone your starter template from the GitHub repository to the user's desired directory
// Replace 'your-username' and 'your-repo' with your actual GitHub username and repository name
const gitRepo = 'https://github.com/naveenfullstack/express-startup.git';
execSync(`git clone ${gitRepo} ${projectPath}`);

// Install the project dependencies
execSync(`cd ${projectPath} && npm install`);

console.log('Your new Express project is ready!');
