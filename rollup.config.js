import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import gzip from 'rollup-plugin-gzip';
import typescript from '@rollup/plugin-typescript';

export default {
  output: {
    name: 'lvovich',
    format: 'umd',
  },
  plugins: [
    typescript({
      module: 'esnext',
      tsconfig: './tsconfig.json',
    }),
    commonjs(),
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      },
    }),
    gzip(),
  ],
};
