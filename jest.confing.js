module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@components/(.*)$': '<rootDir>/src/components/$1',
      '^@services/(.*)$': '<rootDir>/src/services/$1'
    }
};