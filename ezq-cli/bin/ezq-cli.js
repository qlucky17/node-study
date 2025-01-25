#!/usr/bin/env node

const { program } = require('commander');
const { name, version } = require('../package.json');
// const { create } = require('../src/utils/create.js');

program
  .name(name)
  .version(version, '-v, --version')
  .helpOption('-h, --help')
  .usage('<command> [option]');

program
.command('init <project_name>')
.description('创建项目')
.action((project_name) => {
  console.log(project_name);
  // create(project_name);
  require('../src/utils/create.js');
});

program.parse(process.argv);