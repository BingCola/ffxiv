import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';

import base from './webpack.config.base';
import proxy from './proxy';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
const port = '7777';

export default merge(base, {
    plugins: [
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackHarddiskPlugin({
            outputPath: __dirname
        })
    ],
    devServer: {
        hot: true,
        port,
        host: '0.0.0.0',
        inline: true,
        proxy,
        disableHostCheck: true,
        historyApiFallback: {
            verbose: true,
            index: '/app-dev.html'
        }
    }
});
