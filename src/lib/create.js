import chalk from 'chalk';
import fse from 'fs-extra';
import handlebars from 'handlebars';
import inquirer from 'inquirer';
import symbols from 'log-symbols';
import ora from 'ora';
import path from 'path';
import { fileURLToPath } from 'url';
import { dlTemplate } from './download.js';

// 创建项目
async function createProject(projectName) {
  await checkDirExists(projectName);

  try {
    const templateType = await getTemplateType();

    const initSpinner = ora(chalk.cyan('正在准备初始化项目...'));
    initSpinner.start();

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const templatePath = path.resolve(__dirname, '../template/');
    const LCProjectName = projectName.toLowerCase();
    const targetPath = `${processPath}/${LCProjectName}`;

    const tempalteExists = await fse.pathExists(templatePath);
    if (!tempalteExists) {
      await dlTemplate();
    }
    try {
      await fse.copy(templatePath, targetPath);
    } catch (err) {
      console.log(symbols.error, chalk.red(`拉取模板失败. ${err}`));
      process.exit();
    }
    const multiMeta = {
      project_name: LCProjectName,
    };

    const multiFiles = [`${targetPath}/package.json`];

    for (let i = 0; i < multiFiles.length; i++) {
      try {
        const filesContent = await fse.readFile(multiFiles[i], 'utf8');
        const filesResult = await handlebars.compile(filesContent)(multiMeta);
        await fse.outputFile(multiFiles[i], filesResult);
      } catch (err) {
        initSpinner.text = chalk.red(`初始化项目失败 ${err}`);
        initSpinner.fail();
        process.exit();
      }
    }
    initSpinner.text = '初始化项目成功!';
    initSpinner.succeed();
    console.log(`
            启动项目:
              cd ${chalk.yellow(LCProjectName)}
              ${chalk.yellow('npm install')}
              ${chalk.yellow('npm run dev')}
          `);
  } catch (err) {
    console.log(symbols.error, chalk.red(error));
    process.exit();
  }
}

// 检测目录是否存在
async function checkDirExists(projectName) {
  const exists = await fse.pathExists(path.resolve(process.cwd(), projectName));
  if (exists) {
    console.log(symbols.error, chalk.red('当前目录已经有同名的项目了'));
    process.exit();
  }
}

// 通过交互获取用户选择的模板类型
async function getTemplateType() {
  const { templateType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'templateType',
      message: '请选择要创建的项目前端框架',
      choices: [
        {
          name: 'vue',
          value: 'vue',
        },
        {
          name: 'react',
          value: 'react',
        },
      ],
    },
  ]);
  return templateType;
}

export { createProject };
