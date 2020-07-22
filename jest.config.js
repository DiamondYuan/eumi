module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/setupTest.js'],
  testMatch: ['<rootDir>/**/*.spec.ts'],
};
