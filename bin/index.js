#!/usr/bin/env node

const program = require("commander");
// 请求 lib/update.js
const updateChk = require("../lib/update");
// 请求 lib/mirror.js
const setMirror = require("../lib/mirror");
// 请求 lib/download.js
const dlTemplete = require("../lib/download");
// 请求 lib/init.js
const initProject = require("../lib/init");

//init初始化项目
program
  .name("my-cli")
  .usage("<commands [options]>")
  .command("init <project_name>")
  .description("Create a javascript plugin project.")
  .action((project) => {
    initProject(project);
  });

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

// mirror 切换镜像链接
program
  .command("mirror <template_mirror>")
  .description("Set the template mirror.")
  .action((tplMirror) => {
    setMirror(tplMirror);
  });

//template 下载/更新模版
program
  .command("template")
  .description("Download template from mirror")
  .action(() => {
    dlTemplete();
  });

// 从package.json文件中获取version字段的值，-v和--version是参数
program.version(require("../package.json").version, "-v, --version");

// 解析命令行参数
program.parse(process.argv);
