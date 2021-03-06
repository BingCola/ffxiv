/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
export const chunks = {
    home: [path.join(__dirname, './src/pages/home/index.js')],
    gallery: [path.join(__dirname, './src/pages/gallery/index.js')],
    works: [path.join(__dirname, './src/pages/works/index.js')],
    post: [path.join(__dirname, './src/pages/post/index.js')]
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
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/theme'), path.resolve(__dirname, 'src/fonts')],
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, 'src/plugins')],
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            camelCase: true,
                            modules: true,
                            importLoaders: 1,
                            sourceMap: true,
                            localIdentName: 'cp-[name]-[local]'
                        }
                    },
                    {
                        loader: 'sass-loader' // compiles Less to CSS
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, 'src/components')],
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            camelCase: true,
                            modules: true,
                            importLoaders: 1,
                            sourceMap: true,
                            localIdentName: 'cc-[name]-[local]'
                        }
                    },
                    {
                        loader: 'sass-loader' // compiles Less to CSS
                    }
                ]
            },
            {
                test: /\.scss$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/fonts'),
                    path.resolve(__dirname, 'src/theme'),
                    path.resolve(__dirname, 'src/components'),
                    path.resolve(__dirname, 'src/plugins')
                ],
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            camelCase: true,
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[folder]__[name]__[local]__[hash:base64:5]'
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
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }
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
                use: {
                    loader: 'url-loader',
                    options: {
                        publicPath: 'https://www.abc.cn/img/',
                        name: 'assets/img/[name].[hash:7].[ext]'
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css'],
        modules: [
            __dirname,
            path.resolve(__dirname, 'src/common'),
            path.resolve(__dirname, 'src/service'),
            path.resolve(__dirname, 'src/core'),
            path.resolve(__dirname, 'src/components'),
            path.resolve(__dirname, 'src/plugins'),
            path.resolve(__dirname, 'src/theme'),
            path.resolve(__dirname, 'src/fonts'),
            'node_modules'
        ],
        alias: {}
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './src/images/common/favicon.ico',
            hash: true,
            title: 'Default',
            filename: './index.dev/home.html',
            template: './src/index.ejs',
            alwaysWriteToDisk: true,
            chunks: ['home'],
            chunksSortMode: 'manual',
            inject: false
        }),
        new HtmlWebpackPlugin({
            favicon: './src/images/common/favicon.ico',
            hash: true,
            title: 'Default',
            filename: './index.dev/gallery.html',
            template: './src/index.ejs',
            alwaysWriteToDisk: true,
            chunks: ['gallery'],
            chunksSortMode: 'manual',
            inject: false
        }),
        new HtmlWebpackPlugin({
            favicon: './src/images/common/favicon.ico',
            hash: true,
            title: 'Default',
            filename: './index.dev/works.html',
            template: './src/index.ejs',
            alwaysWriteToDisk: true,
            chunks: ['works'],
            chunksSortMode: 'manual',
            inject: false
        }),
        new HtmlWebpackPlugin({
            favicon: './src/images/common/favicon.ico',
            hash: true,
            title: 'Default',
            filename: './index.dev/post.html',
            template: './src/index.ejs',
            alwaysWriteToDisk: true,
            chunks: ['post'],
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
