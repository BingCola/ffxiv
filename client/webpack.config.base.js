/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
export const chunks = {
    app: [path.join(__dirname, './src/index.js')]
};

export default {
    entry: [...chunks],
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: 'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test: /.sass$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /.sass$/,
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'theme')],
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader' // compiles Less to CSS
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/octet-stream'
                    }
                }
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'image/svg+xml'
                    }
                }
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
                use: 'url-loader'
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].[chunkhash].js',
        publicPath: './public'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css'],
        modules: [__dirname, 'node_modules'],
        alias: {
            common: path.resolve(__dirname, './app/common')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'FFXIV幻化回廊',
            filename: 'app-dev.html',
            template: './src/index.ejs',
            alwaysWriteToDisk: true,
            chunks: ['app'],
            chunksSortMode: 'manual',
            inject: false
        })
    ]
};
