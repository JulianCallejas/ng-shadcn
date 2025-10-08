#!/usr/bin/env node

import { Command } from 'commander';
import { installComponent } from './commands/install';
import { initProject } from './commands/init';

const program = new Command();

program
  .name('ng-shadcn')
  .description('CLI for ng-shadcn UI component library')
  .version('1.0.0');

program
  .command('install <component>')
  .description('Install a component into your project')
  .option('-p, --path <path>', 'Installation path', 'src/components')
  .option('-m, --mode <mode>', 'Component mode (signals|observables)', 'signals')
  .action(installComponent);

program
  .command('init')
  .description('Initialize ng-shadcn in your project')
  .action(initProject);

program.parse();