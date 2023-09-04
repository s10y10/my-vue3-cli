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
  onwarn(warning) {
    // 跳过某些警告
    // 在某些Rollup版本中应该拦截...但实际上没有
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    } else if (warning.code === 'CIRCULAR_DEPENDENCY') {
      return;
    }
    console.warn(warning.message);
  },
};
