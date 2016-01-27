import webpack from 'webpack';
import path from 'path';

const SRC_PATH  = path.join(__dirname, 'src');
const DIST_PATH = path.join(__dirname, 'lib');

export default {
    entry: {
        index: [ path.join(SRC_PATH, '') ]
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
                loader: 'babel!eslint'
            }
        ]
    },
    externals: /^[@a-z\-0-9\/]+$/
};