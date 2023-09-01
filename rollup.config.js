import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import clear from 'rollup-plugin-clear';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
    entryFileNames: '[name].cjs',
  },
  plugins: [
    clear({
      targets: ['dist'],
    }),
    json(),
    commonjs(),
    resolve({
      exportConditions: ['node'],
      preferBuiltins: true,
    }),
  ],
};
