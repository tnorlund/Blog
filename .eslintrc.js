// These settings are used by a git pre-commit hook

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    `plugin:react/recommended`,
    `eslint:recommended`
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: `module`
  },
  plugins: [`react`, `react-hooks`, `markdown`],
  settings: {
    react: {
      version: `detect`,
    },
  },
  rules: {
    indent: [`error`, 2, { SwitchCase: 1 }],
    quotes: [`error`, `backtick`, { avoidEscape: true }],
    semi: [`error`, `never`],
    'linebreak-style': [`error`, `unix`],
    'react/prop-types': `off`,
    'react/display-name': `off`,
    'no-console': [`error`, { allow: [`warn`, `error`] }],
    'react-hooks/rules-of-hooks': `error`,
    'react-hooks/exhaustive-deps': `warn`,
    'no-var': `error`,
    'spaced-comment': [`error`, `always`],
    'space-in-parens': [`error`, `always`],
    'object-curly-spacing': [2, `always`],
    'max-len': [`error`, { 'comments': 80 }],
    'no-trailing-spaces': `error`,
  },
  overrides: [
    {
      files: [`*.md`],
      rules: {
        'no-undef': `off`,
        'no-unused-vars': `off`,
        'react/jsx-no-undef': `off`,
        'react/react-in-jsx-scope': `off`,
        'react/jsx-no-comment-textnodes': `off`,
      },
    },
  ],
}
