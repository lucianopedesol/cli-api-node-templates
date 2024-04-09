#!/usr/bin/env node

const program = require('commander');
const { join } = require('path');
const fs = require('fs');
const chalk = require('chalk');
const figlet = require('figlet');

const package = require('./package.json');
const { factoryContent, controllerContent, serviceContent } = require('./module-templates');

program.version(package.version);

console.log(chalk.cyan(figlet.textSync('DevOps CLI')));

function convertToCamelCase(input) {
    const words = input.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join('');
}

function convertVarToCamelCase(input) {
    const words = input.split('-').map((word, index) => {
        return index > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    })
    return words.join('');
}


program
    .command('g m <name>')
    .description('Generate a module api files')
    .action(async (name) => {
        try {
            const propertyName = convertToCamelCase(name)
            const varName = convertVarToCamelCase(name)

            const controller = controllerContent(propertyName, varName);
            const factory = factoryContent(propertyName, varName);
            const service = serviceContent(propertyName, varName);

            const path = join(process.cwd(), name)
            fs.mkdir(join(path), { recursive: true }, cb => { })

            await fs.writeFile(join(path, `${varName}.controller.ts`), controller, err => { });
            await fs.writeFile(join(path, `${varName}.factory.ts`), factory, err => { });
            await fs.writeFile(join(path, `${varName}.service.ts`), service, err => { });

            console.log(`File '${varName}.ts' generated successfully.`);
        } catch (error) {
            console.error('Error generating file:', error);
        }
    });


program.parse(process.argv);