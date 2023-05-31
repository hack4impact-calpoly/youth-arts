module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  overrides: [
    {
      files: ["**/*.test.js", "**/*.test.jsx"],
      env: {
        jest: true,
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    // allow prop-spreading
    "react/jsx-props-no-spreading": "off",
    // allow jsx syntax in js files
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "no-console": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "react/destructuring-assignment": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "react/no-array-index-key": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "react/jsx-no-bind": "off",
    "no-nested-ternary": "off",
  },
};
