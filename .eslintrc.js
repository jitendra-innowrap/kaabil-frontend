module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020, // or "latest"
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
          jsx: true, // If you're using React
        },
      },
      plugins: ['@typescript-eslint'],
      env: {
        es6: true, // Enable ES6 globals
        browser: true, // If you're targeting browsers
      },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Disable no-explicit-any rule
      '@typescript-eslint/no-unused-vars': 'off', // Disable no-unused-vars rule
      'prefer-const': 'off', // Disable prefer-const rule
      '@typescript-eslint/no-wrapper-object-types': 'off', // Disable no-wrapper-object-types rule
    },
  };