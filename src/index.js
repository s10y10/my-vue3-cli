import { program } from 'commander';
import pkg from '../package.json' assert { type: 'json' };
import { createProject } from './lib/create.js';
import { dlTemplate } from './lib/download.js';
import { setMirror } from './lib/mirror.js';
import { prompt } from './lib/prompt.js';
import { updateChk } from './lib/update.js';

// 添加说明和版本号
program
  .name('tfc')
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
program
  .command('upgrade')
  .description('检测脚手架的版本')
  .action(() => {
    updateChk();
  });

// mirror 修改下载路径
program
  .command('mirror <tpl_mirror>')
  .description('设置项目模板的下载路径')
  .action((tplMirror) => {
    setMirror(tplMirror);
  });

//tpl 下载/更新模版
program
  .command('tpl')
  .description('下载项目模板')
  .action(async () => {
    const tplType = await prompt.getTplType('请选择要下载的项目模板');
    dlTemplate(tplType, true);
  });

// 解析命令行参数
program.parse(process.argv);
