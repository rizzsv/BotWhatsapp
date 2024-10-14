import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  { plugins: ["simple-import-sort"] }, // Menambahkan plugin simple-import-sort
  {rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  }},
   pluginJs.configs.recommended,
   tseslint.configs.recommended,
];
