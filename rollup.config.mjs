import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

const packageJson = require("./package.json");

export default {
    input: "src/index.ts",
    output: {
        dir: 'dist',
        format: 'cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: false,
        exports: 'auto'
    },
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        babel({
            exclude: "node_modules/**",
            presets: ["@babel/preset-env", "@babel/preset-react"],
            babelHelpers: "runtime",
        }),
        typescript({
            exclude: [/\.test.((js|jsx|ts|tsx))$/],
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: 'dist'
        }),
        terser(),
        copy({
            targets: [
                { src: 'src/styles/onyx_theme.css', dest: 'dist/styles' },
                { src: 'src/styles/fonts', dest: 'dist/styles' }
            ]
        })
    ],
};