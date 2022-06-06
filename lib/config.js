const fse = require("fs-extra");
const path = require("path");

// 声明配置文件
const jsonConfig = {
  name: "my-vue3-vite-cli",
  mirror: "https://s10y10.github.io/template/",
};

// 拼接config.json完整路径
const configPath = path.resolve(__dirname, "../config.json");

async function defConfig() {
  try {
    // 利用fs-extra，将jsonConfig 内容保存成json文件
    await fse.outputJson(configPath, jsonConfig);
  } catch (e) {
    console.error(err);
    process.exit();
  }
}

module.exports = defConfig;
