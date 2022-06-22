const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
console.log('wenai---', __dirname, process.env.NODE_ENV)

module.exports = {
    entry: {
        app: './src/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    mode: 'development',
    devServer: {
        // static: './dist',
        host: '127.0.0.1',
        hot: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss'],
        alias: {
            'react-virtualized/List': 'react-virtualized/dist/es/List',
        },
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            modules: false,
                            "useBuiltIns": "usage"
                        }]],
                        plugins: [require.resolve('react-refresh/babel')],
                        cacheDirectory: true,
                    },
                }]
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', {
                                modules: false,
                            }]],
                            plugins: [require.resolve('react-refresh/babel')],
                            cacheDirectory: true,
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            getCustomTransformers: () => ({
                                before: [ReactRefreshTypeScript()],
                            }),
                            transpileOnly: true,
                        }
                    }
                ],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env']
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass')
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
                // generator: {
                //     emit: false,
                //     publicPath: 'assets/',
                // },
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ]
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack5-react',
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'index.html'
        }),
        // new CleanWebpackPlugin(),
        // new friendlyErrorsWebpackPlugin(),
        // new MiniCssExtractPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'inline-source-map'
    // devtool: 'eval-cheap-module-source-map'
}