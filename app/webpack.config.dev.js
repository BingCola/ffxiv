import 'webpack';
import 'path';
import merge from 'webpack-merge';

import base from './webpack.config.base';
const port = '7777';
const publicPath = '/public';

export default merge(base, {
    devServer: {
        port,
        host: '0.0.0.0',
        inline: true,
        proxy,
        disableHostCheck: true,
        historyApiFallback: {
            verbose: true,
            index: '/app-dev.html',
        },
        publicPath,
    },
});
