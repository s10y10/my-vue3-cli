const download = require("download");
//ora库用于实现等待动画
const ora = require("ora");
const chalk = require("chalk");

const fse = require("fs-extra");
const path = require("path");

//解压缩zip用
const extract = require("extract-zip");

const defConfig = require("./config");

const cfgPath = path.resolve(__dirname, "../config.json");
const tplPath = path.resolve(__dirname, "../template");

const zipFilename = "vue3-vite-template.zip";

async function dlTemplete() {
  const exist = await fse.pathExists(cfgPath);
  if (exist) {
    await dlAction();
  } else {
    await defConfig();
    await dlAction();
  }
}

async function dlAction() {
  try {
    await fse.remove(tplPath);
  } catch (err) {
    console.err(err);
    process.exit();
  }

  const jsonConfig = await fse.readJson(cfgPath);
  const dlSpinner = ora(chalk.cyan("Downloading template..."));

  dlSpinner.start();

  const downloadUrl = jsonConfig.mirror + zipFilename;
  const targetDir = path.resolve(__dirname, "../template/");
  const targetFile = path.resolve(targetDir, zipFilename);

  try {
    await download(downloadUrl, targetDir, {
      extract: false,
    });
    await extract(targetFile, { dir: targetDir });
    await fse.remove(targetFile);
  } catch (err) {
    dlSpinner.text = chalk.red(
      `Download template(${downloadUrl}) failed. ${err}`
    );
    dlSpinner.fail();
    process.exit();
  }

  dlSpinner.text = "Download template successful.";
  dlSpinner.succeed();
}

module.exports = dlTemplete;
