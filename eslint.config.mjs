import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  {ignores: ["node_modules/**", "dist/**", "build/**", "src/assets/**"]},
  {
    files: ["src/**/*.{js,jsx}", "*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {...globals.browser, ...globals.node},
      parserOptions: {ecmaFeatures: {jsx: true}}
    },
    plugins: {react, "react-hooks": hooks, "jsx-a11y": jsxA11y},
    settings: {react: {version: "18.3"}},
    rules: {
      ...js.configs.recommended.rules,
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/no-static-element-interactions": "error"
    }
  },
  {
    files: ["fetch.js"],
    languageOptions: {sourceType: "commonjs", globals: globals.node},
    rules: js.configs.recommended.rules
  }
];
