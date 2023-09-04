import chalk from 'chalk';
import fse from 'fs-extra';
import handlebars from 'handlebars';
import symbols from 'log-symbols';
import ora from 'ora';
import path from 'path';
import { dlTemplate } from './download.js';
import { prompt } from './prompt.js';
import { tools } from './tools.js';

// 创建项目
async function createProject(projectName) {
  await checkDirExists(projectName);
  try {
    const tplType = await prompt.getTplType();
    // 添加loading
    const initSpinner = ora(chalk.cyan('正在准备初始化项目...'));
    initSpinner.start();

    // 声明目录
    const tplPath = tools.getTplPath();
    await fse.remove(tplPath);
    await fse.ensureDir(tplPath);
    const targetPath = path.resolve(process.cwd(), projectName);

    try {
      // 下载模板并拷贝到项目目录
      await dlTemplate(tplType);
      await fse.copy(tplPath, targetPath);
      await fse.remove(tplPath);
    } catch (err) {
      console.log(symbols.error, chalk.red(`拉取模板失败. ${err}`));
      process.exit();
    }

    // 替换模板项目内容
    const multiMeta = {
      project_name: projectName,
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

    // 输出项目启动提示
    console.log(`
            启动项目:
              ${chalk.yellow(`cd ${projectName}`)}
              ${chalk.yellow('npm install')}
              ${chalk.yellow('npm run dev')}
          `);
  } catch (err) {
    console.log(symbols.error, chalk.red(err));
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

export { createProject };
