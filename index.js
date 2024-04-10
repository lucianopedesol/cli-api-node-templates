#!/usr/bin/env node

const program = require('commander');
const { join } = require('path');
const fs = require('fs');
const chalk = require('chalk');
const figlet = require('figlet');

const package = require('./package.json');
const { factoryContent, controllerContent, serviceContent, repositoryContent, entityContent } = require('./module-templates');

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
    .command('services <name>')
    .description('Generate a module api files')
    .action(async (name) => {
        try {
            const propertyName = convertToCamelCase(name)
            const varName = convertVarToCamelCase(name)

            const controller = controllerContent(propertyName, varName);
            const factory = factoryContent(propertyName, varName);
            const service = serviceContent(propertyName, varName);
            const repository = repositoryContent(propertyName, varName);
            const entity = entityContent(propertyName, varName);

            const modulePath = join(process.cwd(), 'module/', name)
            const repositoryPath = join(process.cwd(), 'repositories/', name) 
            const entityPath = join(process.cwd(), 'entities/') 

            await fs.mkdirSync(join(modulePath), { recursive: true }, cb => { })
            await fs.mkdirSync(join(repositoryPath), { recursive: true }, cb => { })
            await fs.mkdirSync(join(entityPath), { recursive: true }, cb => { })

            await fs.writeFileSync(join(modulePath, `${varName}.controller.ts`), controller, err => { });
            await fs.writeFileSync(join(modulePath, `${varName}.factory.ts`), factory, err => { });
            await fs.writeFileSync(join(modulePath, `${varName}.service.ts`), service, err => { });
            await fs.writeFileSync(join(repositoryPath, `index.ts`), repository, err => { });
            await fs.writeFileSync(join(entityPath, `${varName}.ts`), entity, err => { });

            console.log(`File '${varName}.ts' generated successfully.`);
        } catch (error) {
            console.error('Error generating file:', error);
        }
    });


program.parse(process.argv);