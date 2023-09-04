// package-json获取最新版本信息
import pkgJson from 'package-json';
// semver 对比版本号
import semver from 'semver';
// 引用chalk库用于控制台字符样式
import chalk from 'chalk';
// 引入package.json，用于对比版本号
import pkg from '../../package.json' assert { type: 'json' };

async function updateChk() {
  try {
    const info = await pkgJson(pkg.name);
    const currentVersion = pkg.version;
    const latestVersion = info.version;
    if (semver.gt(latestVersion, currentVersion)) {
      console.log(
        `有最新的脚手架版本: ${chalk.cyan(latestVersion)}, 建议您在使用前更新`
      );
    } else {
      console.log('No new version is available');
    }
  } catch (e) {
    console.log(e);
  }
}

export { updateChk };
