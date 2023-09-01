import { program } from 'commander';
import pkg from '../package.json' assert { type: 'json' };
import dlTemplete from './lib/download.js';
import { createProject } from './lib/init.js';
import setMirror from './lib/mirror.js';
import updateChk from './lib/update.js';

// 添加说明和版本号
program
  .name('sy-cli-vite')
  .description('创建vite项目的脚手架工具')
  .usage('<commands [options]>')
  .helpOption('-h, --help', '显示可使用命令提示')
  .addHelpCommand(false)
  .version(pkg.version, '-v, --version', '显示脚手架的当前版本');

//创建项目
program
  .command('create <project_name>')
  .description('创建一个vite项目')
  .action((project) => {
    createProject(project);
  });

// upgrade 检测更新
// 声明命令
// 描述信息，在帮助信息时显示
// 执行 lib/update.js里面的逻辑
program
  .command('upgrade')
  .description('检测并升级脚手架的版本')
  .action(() => {
    updateChk();
  });

// mirror 切换镜像链接
program
  .command('mirror <template_mirror>')
  .description('设置项目模板的下载路径')
  .action((tplMirror) => {
    setMirror(tplMirror);
  });

//template 下载/更新模版
program
  .command('template')
  .description('下载项目模板')
  .action(() => {
    dlTemplete();
  });

// 解析命令行参数
program.parse(process.argv);
