#!/usr/bin/env node

// 请求commander库
const program = require("commander");
// 请求 lib/update.js
const updateChk = require("../lib/update");

// upgrade 检测更新
// 声明命令
// 描述信息，在帮助信息时显示
// 执行 lib/update.js里面的逻辑
program
  .command("upgrade")
  .description("Check the my-cli version.")
  .action(() => {
    updateChk();
  });

// 从package.json文件中获取version字段的值，-v和--version是参数
program.version(require("../package.json").version, "-v, --version");

// 解析命令行参数
program.parse(process.argv);
