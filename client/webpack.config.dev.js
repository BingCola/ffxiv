import 'webpack';
import 'path';
import merge from 'webpack-merge';

import base from './webpack.config.base';
import proxy from './proxy';

const port = '7777';

export default merge(base, {
    plugins: [new webpack.NamedModulesPlugin()],
    devServer: {
        hot: true,
        port,
        host: '0.0.0.0',
        inline: true,
        proxy,
        disableHostCheck: true
    }
});
