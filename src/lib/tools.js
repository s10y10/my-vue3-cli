import path from 'path';
import { fileURLToPath } from 'url';

const getDirname = () => {
  return path.dirname(fileURLToPath(import.meta.url));
};

const getJsonPath = () => {
  return path.resolve(getDirname(), '../config.json');
};

const getTplPath = (onlyDownload = false) => {
  if (onlyDownload) {
    return path.resolve(process.cwd(), 'tpl');
  }
  return path.resolve(getDirname(), 'tpl');
};

export const tools = {
  getDirname,
  getJsonPath,
  getTplPath,
};
