import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import eslintPluginPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
    eslintPluginPrettier,
    {
        rules: {
            "no-unused-vars": "error",
            "no-undef": "error",
        },
    },
    { files: ["**/*.{js,mjs,cjs,vue}"] },
    {
        languageOptions: {
            globals: globals.browser,
        },
    },
    pluginJs.configs.recommended,
    ...pluginVue.configs["flat/essential"],
];
