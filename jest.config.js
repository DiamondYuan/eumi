module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/setupTest.js',
  collectCoverageFrom: ['<rootDir>/packages/eumi/src/**/*.ts'],
  testPathIgnorePatterns: ['<rootDir>/.eumi_test_tmpdir/'],
  testMatch: ['<rootDir>/**/*.spec.ts'],
};
