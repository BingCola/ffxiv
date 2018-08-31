import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';

import base from './webpack.config.base';
import proxy from './proxy';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
const port = '7777';

export default merge(base, {
    mode: 'development',
    output: {
        filename: '[name].js'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackHarddiskPlugin({
            outputPath: __dirname
        }),
        new webpack.HotModuleReplacementPlugin()
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
            index: '/index.dev/index.html',
            rewrites: [{ from: /^\/test$/, to: '/index.dev/indexTest.html' }]
        },
        publicPath: '/dist'
    }
});
