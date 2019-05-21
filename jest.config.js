module.exports = {
  testEnvironment: '<rootDir>/config/testing/mongo-environment.js',
  globalSetup: '<rootDir>/config/testing/setup.js',
  globalTeardown: '<rootDir>/config/testing/teardown.js',
  setupFilesAfterEnv: [ "<rootDir>/config/testing/mocks.js" ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};