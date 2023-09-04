import path from 'path';
import { fileURLToPath } from 'url';

const getDirname = () => {
  return path.dirname(fileURLToPath(import.meta.url));
};

const getJsonPath = () => {
  return path.resolve(getDirname(), '../config.json');
};

const getTplPath = (tplType) => {
  return path.resolve(getDirname(), 'template', tplType);
};

export const tools = {
  getDirname,
  getJsonPath,
  getTplPath,
};
