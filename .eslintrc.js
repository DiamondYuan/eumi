module.exports = {
  extends: ['@diamondyuan/typescript', 'prettier', 'prettier/@typescript-eslint'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/class-name-casing': 'off',
  },
};
