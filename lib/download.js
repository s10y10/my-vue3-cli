const download = require("download");
//ora库用于实现等待动画
const ora = require("ora");
const chalk = require("chalk");

const fse = require("fs-extra");
const path = require("path");

const defConfig = require("./config");

const cfgPath = path.resolve(__dirname, "../config.json");
const tplPath = path.resolve(__dirname, "../template");

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
  try {
    await download(
      jsonConfig.mirror + "template.zip",
      path.resolve(__dirname, "../template/"),
      {
        extract: true,
      }
    );
  } catch (err) {
    dlSpinner.text = chalk.red(`Download template failed. ${err}`);
    dlSpinner.fail();
    process.exit();
  }
  dlSpinner.text = "Download template successful.";
  dlSpinner.succeed();
}

module.exports = dlTemplete;
