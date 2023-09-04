import chalk from 'chalk';
import fse from 'fs-extra';
import symbols from 'log-symbols';
import { defConfig } from './config.js';
import { tools } from './tools.js';

const cfgPath = tools.getJsonPath();

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
    console.log(symbols.success, '设置镜像地址成功');
  } catch (e) {
    console.log(symbols.error, chalk.red(`设置镜像地址失败 ${e}`));
    process.exit();
  }
}

export { setMirror };
