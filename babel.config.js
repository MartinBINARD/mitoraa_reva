module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['.'],
                extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
                alias: {
                    '@core': './core',
                },
            },
        ],
        ['@babel/plugin-transform-private-methods', { loose: true }],
    ],
};
