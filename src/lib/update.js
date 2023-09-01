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
    const info = await pkgJson('@17jx/jxjs-cli', {
      registryUrl: 'https://npmjs.com',
    });
    const currentVersion = pkg.version;
    const latestVersion = info.version;
    if (semver.gt(latestVersion, currentVersion)) {
      console.log(
        `New version availabel: ${chalk.cyan(
          latestVersion
        )}, it's recommended that you update befor using.`
      );
    } else {
      console.log('No new version is available');
    }
  } catch (e) {
    console.log(e);
  }
}

export default updateChk;