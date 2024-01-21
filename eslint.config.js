/*
{
  "extends": "@antfu",
  "rules": {
    "semi": ["error", "always"],
    "@typescript-eslint/semi": ["error", "always"],
    "no-use-before-define": ["error", { "functions": false, "classes": true, "variables": true }],
    "@typescript-eslint/no-use-before-define": ["error", "nofunc"]
  }
}
*/

import antfu from '@antfu/eslint-config';

export default antfu(
  { vue: true, typescript: true },
  {
    // Without `files`, they are general rules for all files
    rules: {
      'style/semi': ['error', 'always'],
    },
  },
);
