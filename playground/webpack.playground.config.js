const path = require('path');

const SRC_PATH  = path.join(__dirname, 'src');
const DIST_PATH = path.join(__dirname, 'output');

module.exports = {
    context: SRC_PATH,

    entry: {
        playground: './playground'
    },
    output: {
        publicPath  : '/',
        path        : DIST_PATH,
        filename    : '[name].js',
    },
    resolve: {
        extensions: [ '', '.jsx', '.js' ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules|lib/,    // lib - react-core-decorators lib
                loaders: [
                    'babel',
                    'eslint'
                ]
            }
        ]
    },

    stats: {
        version: false
    }
};