module.exports = {
  root: true,
  env: { browser: true, es2020: true, "jest/globals": true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'standard',
    'standard-jsx'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'cypress'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'jest'],
  rules: {

    "react/prop-types": "off",
    "react/jsx-handler-names": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
