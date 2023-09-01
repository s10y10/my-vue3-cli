import chalk from 'chalk';
import fse from 'fs-extra';
import symbols from 'log-symbols';
import path from 'path';
import defConfig from './config.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cfgPath = path.resolve(__dirname, '../config.json');

async function setMirror(link) {
  //判断config.json是否已经存在,存在就写入配置,不存在先生成config.json
  const exists = await fse.pathExists(cfgPath);
  if (exists) {
    mirrorAction(link);
  } else {
    await defConfig();
    mirrorAction(link);
  }
}

async function mirrorAction(link) {
  try {
    const jsonConfig = await fse.readJson(cfgPath);
    jsonConfig.mirror = link;
    await fse.writeJson(cfgPath, jsonConfig);
    console.log(symbols.success, 'Set the mirror successful.');
  } catch (e) {
    console.log(symbols.error, chalk.red(`Set the mirror failed. ${e}`));
    process.exit();
  }
}

export default setMirror;
