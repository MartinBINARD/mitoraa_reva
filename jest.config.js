module.exports = {
    preset: 'react-native',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|react-native-svg|i18n-js)',
        'jest-runner',
    ],
    setupFilesAfterEnv: [
        '<rootDir>/jest.setup.ts',
        '@testing-library/jest-native/extend-expect',
        './node_modules/react-native-gesture-handler/jestSetup.js',
    ],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '@react-native'],
    testMatch: ['**/*.test.ts?(x)', '**/*.test.js?(x)'],
};
