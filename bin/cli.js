#!/usr/bin/env node
const {execSync} = require('child_process');

const runCommand = command => {
    try {
        execSync(`${command}`, {studio : 'inherit'});
    } catch (e) {
        console.error(`Failed To Execute ${command} `, e);
        return false;
    }
    return false;
}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/naveenfullstack/express-startup.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if(!checkedOut) process.exit(code);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if(!installedDeps) process.exit(code);

console.log("Congratulations! you are ready. Follow the follwing commands to start ");
