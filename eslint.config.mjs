import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default {
  ignores: ["node_modules", "dist"],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.node, // ✅ Add Node.js globals (process, module, etc.)
    },
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

    // ✅ Optional customizations:
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
