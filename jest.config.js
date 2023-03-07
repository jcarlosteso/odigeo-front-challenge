module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(jpg|jpeg|png)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.css': 'identity-obj-proxy'
  }
}