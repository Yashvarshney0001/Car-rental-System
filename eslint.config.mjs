import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default {
  ignores: ["node_modules", "dist"],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: globals.browser,
    parser: tseslint.parser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    react: reactPlugin,
    "@typescript-eslint": tseslint.plugin,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,
    ...reactPlugin.configs.recommended.rules,

    // Disable React-in-scope rule for JSX:
    "react/react-in-jsx-scope": "off",

    // Optionally allow "any" types:
    "@typescript-eslint/no-explicit-any": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
