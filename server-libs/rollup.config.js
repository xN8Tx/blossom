import dts from 'rollup-plugin-dts';
import dotenv from 'dotenv';

import packageJson from './package.json';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';

dotenv.config();

// eslint-disable-next-line no-undef
const DIR_PATH = __dirname;

const plugins = [
  typescript({
    tsconfig: `${DIR_PATH}/tsconfig.json`,
  }),
  peerDepsExternal(),
  json(),
  resolve(),
  commonjs(),
  // terser(),
];

export default [
  {
    input: `${DIR_PATH}/src/index.ts`,
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins,
  },
  {
    input: `${DIR_PATH}/dist/src/index.d.ts`,
    output: [{ file: `${DIR_PATH}/dist/index.d.ts`, format: 'cjs' }],
    plugins: [dts.default()],
  },
];
