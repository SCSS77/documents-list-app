module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
      '^@components/(.*)$': '<rootDir>/src/components/$1',
      '^@services/(.*)$': '<rootDir>/src/services/$1',
      '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transform: {
      '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
};