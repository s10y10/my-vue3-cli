import fse from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// 声明配置文件
const jsonConfig = {
  name: 'sy-cli-vite',
  mirror: 'https://s10y10.github.io/',
};

// 拼接config.json完整路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.resolve(__dirname, '../config.json');

async function defConfig() {
  try {
    // 利用fs-extra，将jsonConfig 内容保存成json文件
    await fse.outputJson(configPath, jsonConfig);
  } catch (e) {
    console.error(err);
    process.exit();
  }
}

export default defConfig;
