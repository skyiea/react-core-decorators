const path = require('path');

const SRC_PATH  = path.join(__dirname, 'src');
const DIST_PATH = path.join(__dirname, 'lib');

module.exports = {
    entry: {
        index: SRC_PATH
    },
    output: {
        path            : DIST_PATH,
        filename        : '[name].js',
        libraryTarget   : 'commonjs2'
    },
    resolve: {
        extensions: [ '', '.jsx', '.js' ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: [
                    'babel',
                    'eslint'
                ]
            }
        ]
    },
    // we don't want React to go into resulting bundle, it should remain as peer dep
    externals: /^[@a-z\-0-9\/]+$/
};