import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier/flat";
import prettierPlugin from "eslint-plugin-prettier";

export default tseslint.config(
  {
    plugins: { prettier: prettierPlugin },
    rules: { "prettier/prettier": "error" },
  },
  prettierConfig,
);
