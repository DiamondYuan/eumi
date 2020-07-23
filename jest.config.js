module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/setupTest.js'],
  testPathIgnorePatterns: ['<rootDir>/.eumi_test_tmpdir/'],
  testMatch: ['<rootDir>/**/*.spec.ts'],
};
