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
    .command('complete-feature <name>')
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

            if (!fs.existsSync(modulePath))
                await fs.mkdirSync(modulePath, { recursive: true }, cb => { });

            if (!fs.existsSync(repositoryPath))
                await fs.mkdirSync(repositoryPath, { recursive: true }, cb => { });

            if (!fs.existsSync(entityPath))
                await fs.mkdirSync(entityPath, { recursive: true }, cb => { });

            if (!fs.existsSync(join(modulePath, `${varName}.controller.ts`)))
                await fs.writeFileSync(join(modulePath, `${varName}.controller.ts`), controller, err => { });

            if (!fs.existsSync(join(modulePath, `${varName}.factory.ts`)))
                await fs.writeFileSync(join(modulePath, `${varName}.factory.ts`), factory, err => { });

            if (!fs.existsSync(join(modulePath, `${varName}.service.ts`)))
                await fs.writeFileSync(join(modulePath, `${varName}.service.ts`), service, err => { });

            if (!fs.existsSync(join(repositoryPath, `index.ts`)))
                await fs.writeFileSync(join(repositoryPath, `index.ts`), repository, err => { });

            if (!fs.existsSync(join(entityPath, `${varName}.ts`)))
                await fs.writeFileSync(join(entityPath, `${varName}.ts`), entity, err => { });


            console.log(`Feature '${name}' generated successfully.`);
        } catch (error) {
            console.error('Error generating file:', error);
        }
    });

program
    .command('module <name>')
    .description('Generate a module api files')
    .action(async (name) => {
        try {
            const propertyName = convertToCamelCase(name)
            const varName = convertVarToCamelCase(name)

            const controller = controllerContent(propertyName, varName);
            const factory = factoryContent(propertyName, varName);
            const service = serviceContent(propertyName, varName);

            const modulePath = join(process.cwd(), 'module/', name)

            if (!fs.existsSync(modulePath))
                await fs.mkdirSync(modulePath, { recursive: true }, cb => { });
 
            if (!fs.existsSync(join(modulePath, `${varName}.controller.ts`)))
                await fs.writeFileSync(join(modulePath, `${varName}.controller.ts`), controller, err => { });

            if (!fs.existsSync(join(modulePath, `${varName}.factory.ts`)))
                await fs.writeFileSync(join(modulePath, `${varName}.factory.ts`), factory, err => { });

            if (!fs.existsSync(join(modulePath, `${varName}.service.ts`)))
                await fs.writeFileSync(join(modulePath, `${varName}.service.ts`), service, err => { });
 
            console.log(`Module '${name}' generated successfully.`);
        } catch (error) {
            console.error('Error generating file:', error);
        }
    });


program
    .command('module <name>')
    .description('Generate a module api files')
    .action(async (name) => {
        try {
            const propertyName = convertToCamelCase(name)
            const varName = convertVarToCamelCase(name)

            const controller = controllerContent(propertyName, varName);
            const factory = factoryContent(propertyName, varName);
            const service = serviceContent(propertyName, varName);

            const modulePath = join(process.cwd(), 'module/', name)

            if (!fs.existsSync(modulePath))
                await fs.mkdirSync(modulePath, { recursive: true }, cb => { });
 
            if (!fs.existsSync(join(modulePath, `${varName}.controller.ts`)))
                await fs.writeFileSync(join(modulePath, `${varName}.controller.ts`), controller, err => { });

            if (!fs.existsSync(join(modulePath, `${varName}.factory.ts`)))
                await fs.writeFileSync(join(modulePath, `${varName}.factory.ts`), factory, err => { });

            if (!fs.existsSync(join(modulePath, `${varName}.service.ts`)))
                await fs.writeFileSync(join(modulePath, `${varName}.service.ts`), service, err => { });
 
            console.log(`Module '${name}' generated successfully.`);
        } catch (error) {
            console.error('Error generating file:', error);
        }
    });


program
.command('entity <name>')
.description('Generate a module api files')
.action(async (name) => {
    try {
        const propertyName = convertToCamelCase(name)
        const varName = convertVarToCamelCase(name) 
        const entity = entityContent(propertyName, varName);
 
        const entityPath = join(process.cwd(), 'entities/')
        
        if (!fs.existsSync(entityPath))
            await fs.mkdirSync(entityPath, { recursive: true }, cb => { });
 
        if (!fs.existsSync(join(entityPath, `${varName}.ts`)))
            await fs.writeFileSync(join(entityPath, `${varName}.ts`), entity, err => { });


        console.log(`Entity '${name}' generated successfully.`);
    } catch (error) {
        console.error('Error generating file:', error);
    }
});


program
    .command('repository <name>')
    .description('Generate a module api files')
    .action(async (name) => {
        try {
            const propertyName = convertToCamelCase(name)
            const varName = convertVarToCamelCase(name)
 
            const repository = repositoryContent(propertyName, varName);

            const repositoryPath = join(process.cwd(), 'repositories/', name)
 
            if (!fs.existsSync(repositoryPath))
                await fs.mkdirSync(repositoryPath, { recursive: true }, cb => { });
 
            if (!fs.existsSync(join(repositoryPath, `index.ts`)))
                await fs.writeFileSync(join(repositoryPath, `index.ts`), repository, err => { });
 
            console.log(`Repository '${name}' generated successfully.`);
        } catch (error) {
            console.error('Error generating file:', error);
        }
    });

program.parse(process.argv);