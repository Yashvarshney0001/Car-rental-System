import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
    },
    rules: {
      // Disable the rule requiring React to be in scope for JSX:
      "react/react-in-jsx-scope": "off",

      // Optionally allow explicit 'any' types in TypeScript:
      "@typescript-eslint/no-explicit-any": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
];
