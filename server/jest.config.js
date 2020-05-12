module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@common/(.*)': '<rootDir>/../common/$1.ts'
  }
}
