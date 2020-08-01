module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/setupTest.js',
  testPathIgnorePatterns: ['<rootDir>/.eumi_test_tmpdir/'],
  testMatch: ['<rootDir>/**/*.spec.ts'],
};
