module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index.js',
    ],
    output: {
        filename: './bundle.js'
    },
    module: {
        loaders: [{
            exclude: '/node_modules/',
            loader: 'babel-loader'
        }]
    }
};
