import fse from 'fs-extra';
import { tools } from './tools.js';

// 声明配置文件
const jsonConfig = {
  mirror: 'https://s10y10.github.io/',
};

async function defConfig() {
  try {
    // 利用fs-extra，将jsonConfig 内容保存成json文件
    await fse.outputJson(tools.getJsonPath(), jsonConfig);
  } catch (e) {
    console.error(err);
    process.exit();
  }
}

export { defConfig };
