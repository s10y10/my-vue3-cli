import chalk from 'chalk';
import extract from 'extract-zip';
import fse from 'fs-extra';
import fetch from 'node-fetch';
import ora from 'ora';
import path from 'path';
import { defConfig } from './config.js';
import { tools } from './tools.js';

const cfgPath = tools.getJsonPath();
const zipFilenameDic = {
  vue: 'vue3-vite-template.zip',
  react: 'vue3-vite-template.zip',
};

async function dlTemplate(tplType) {
  const exist = await fse.pathExists(cfgPath);
  if (exist) {
    await dlAction(tplType);
  } else {
    await defConfig();
    await dlAction(tplType);
  }
}

async function dlAction(tplType) {
  try {
    const tplPath = tools.getTplPath(tplType);
    await fse.remove(tplPath);
    await fse.ensureDir(tplPath);
  } catch (err) {
    console.err(err);
    process.exit();
  }

  const jsonConfig = await fse.readJson(cfgPath);
  const dlSpinner = ora(chalk.cyan('Downloading template...'));
  dlSpinner.start();

  // 声明路径
  const zipFilename = zipFilenameDic[tplType];
  const downloadUrl = jsonConfig.mirror + zipFilename;
  const targetDir = path.resolve(__dirname, 'template');
  const targetFile = path.resolve(targetDir, zipFilename);

  try {
    const res = await fetch(downloadUrl);
    const fileStream = fse.createWriteStream(targetFile);
    await new Promise((resolve, reject) => {
      res.body.pipe(fileStream);
      res.body.on('error', (err) => {
        reject(err);
      });
      fileStream.on('finish', function () {
        resolve();
      });
    });
    await extract(targetFile, { dir: targetDir });
    await fse.remove(targetFile);
  } catch (err) {
    dlSpinner.text = chalk.red(
      `Download template(${downloadUrl}) failed. ${err}`
    );
    dlSpinner.fail();
    process.exit();
  }

  dlSpinner.text = 'Download template successful.';
  dlSpinner.succeed();
}

export { dlTemplate };
