/* eslint-disable import/no-extraneous-dependencies */

import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
  format: 'umd',
  moduleName: 'lvovich',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    nodeResolve(),
    commonjs(),
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
  ],
};
