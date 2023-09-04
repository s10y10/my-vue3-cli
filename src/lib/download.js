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

async function dlTemplate(tplType, onlyDownload = false) {
  // 读取配置文件
  const exist = await fse.pathExists(cfgPath);
  if (!exist) {
    await defConfig();
  }

  // 确保下载路径
  const tplPath = tools.getTplPath(onlyDownload);
  await fse.remove(tplPath);
  await fse.ensureDir(tplPath);

  const jsonConfig = await fse.readJson(cfgPath);
  const dlSpinner = ora(chalk.cyan('正在下载模板...'));
  dlSpinner.start();

  // 声明路径变量
  const zipFilename = zipFilenameDic[tplType];
  const downloadUrl = jsonConfig.mirror + zipFilename;
  const targetFile = path.resolve(tplPath, zipFilename);

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
    // 如果不是仅下载模板,就解压缩并删除zip文件
    if (!onlyDownload) {
      await extract(targetFile, { dir: tplPath });
      await fse.remove(targetFile);
    }
  } catch (err) {
    dlSpinner.text = chalk.red(`下载模板(${downloadUrl}) 失败 ${err}`);
    dlSpinner.fail();
    process.exit();
  }

  dlSpinner.text = '下载模板成功.';
  dlSpinner.succeed();
}

export { dlTemplate };
