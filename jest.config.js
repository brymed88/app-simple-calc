/** @type {import('jest').Config} */

const config = {
   preset: 'jest-expo',
   setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
   moduleNameMapper: { '\\.(css|less|sass|scss)$': '<rootDir>/config/styleMock.js' },
}

module.exports = config
