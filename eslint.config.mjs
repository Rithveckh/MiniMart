import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // ✅ Use recommended Next.js + TypeScript rules
  ...compat.extends("next/core-web-vitals", "next", "next/typescript"),

  // ✅ Custom rules section (optional)
  {
    rules: {
      // Allow unused imports during development
      "@typescript-eslint/no-unused-vars": "warn",

      // Escape single quotes in JSX
      "react/no-unescaped-entities": "warn",

      // Enable this if you're importing React manually in some files
      "react/react-in-jsx-scope": "off",
    },
  },
];
