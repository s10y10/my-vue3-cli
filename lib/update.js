// 引用update-notifier库，检查更新
const updateNotifier = require("update-notifier");

// 引用chalk库用于控制台字符样式
const chalk = require("chalk");

// 引入package.json，用于update-notifier读取信息
const pkg = require("../package.json");

// 从packge.json中获取name和version查询
// 设定检查更新周期，默认为 1000 * 60 * 60 * 24 (1天)
// 这里设定为1000毫秒
const notifier = updateNotifier({ pkg, updateCheckInterval: 1000 });

function updateChk() {
  // 检测到版本时，notifier.update会返回object
  // 此时可以用 notifier.update.latest 获取最新版本号
  if (notifier.update) {
    console.log(
      `New version availabel: ${chalk.cyan(
        notifier.update.latest
      )}, it's recommended that you update befor using.`
    );
    notifier.notify();
  } else {
    console.log("No new version is available");
  }
}

module.exports = updateChk;
