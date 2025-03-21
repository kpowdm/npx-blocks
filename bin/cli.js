#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');

program
    .command('add <component>')
    .description('Добавить шаблон компонента')
    .action(async (component) => {
        try {
            const templatePath = path.join(__dirname, '../templates', component);

            let userComponentsJson
            try{
                userComponentsJson = require(path.join(process.cwd(), 'components.json'));
            } catch(err){}

            let componentPath = userComponentsJson?.['aliases']?.components || 'components';

            if(componentPath.includes('@/') || componentPath.includes('~/')) {
                const regex  = new RegExp('[@~]/');
                componentPath = componentPath.replace(regex, '')
            }

            const targetPath = path.join(process.cwd(), componentPath, component);

            await fs.copy(templatePath, targetPath);

            console.log(`✅ ${component} успешно добавлен!`);
        } catch (error) {
            console.error(`Ошибка: ${error.message}`);
        }
    });

program.parse(process.argv);