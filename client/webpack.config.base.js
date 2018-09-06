/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
export const chunks = {
    home: [path.join(__dirname, './src/pages/Home/index.js')]
};

export default {
    entry: chunks,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        publicPath: './dist'
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: 'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test: /.scss$/,
                include: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'theme')],
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /.scss$/,
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
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css'],
        modules: [
            __dirname,
            path.resolve(__dirname, 'src/service'),
            path.resolve(__dirname, 'src/core'),
            path.resolve(__dirname, 'src/components'),
            path.resolve(__dirname, 'src/theme'),
            'node_modules'
        ],
        alias: {}
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './src/images/common/favicon.ico',
            hash: true,
            title: 'FFXIV幻化回廊',
            filename: './index.dev/home.html',
            template: './src/index.ejs',
            alwaysWriteToDisk: true,
            chunks: ['home'],
            chunksSortMode: 'manual',
            inject: false
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            moment: 'moment'
        })
    ]
};
