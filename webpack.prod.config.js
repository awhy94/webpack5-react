const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ReactRefreshTypeScript = require('react-refresh-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpack = require('webpack');

const smp = new SpeedMeasurePlugin();

const webpackConfig = smp.wrap({
    // entry: {
    //     app: {import: './src/index.tsx', runtime: 'vendors-runtime'},
    //     test: {import: './src/test.tsx', runtime: 'vendors-runtime'},
    // },
    entry: {
        app: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.[hash:6].js',
    },
    mode: 'production',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss'],
        alias: {
            'react-virtualized/List': 'react-virtualized/dist/es/List',
        },
    },
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: 2,
                extractComments: false,
                terserOptions: {
                    // compress: false,
                    mangle: false,
                    // module: true
                    // compress: {
                    //   pure_funcs: ["console.log"]
                    // }
                    format: {
                        beautify: true,
                    },
                    toplevel: true
                },
            }),
            new CssMinimizerPlugin({
                test: /\.css$/i,
                exclude: /node_modules/,
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
        runtimeChunk: 'single',
        splitChunks: {
            automaticNameDelimiter: '~',
            chunks: 'all',
            cacheGroups: {
                reactdom: {
                    name: 'reactdom',
                    priority: 5,
                    test: /[\/]node_modules[\/]react-dom[\/]/,
                    chunks: 'initial',
                    minSize: 100,
                    minChunks: 1,
                },
                react: {
                    name: 'react',
                    priority: 5,
                    test: /[\/]node_modules[\/]react[\/]/,
                    chunks: 'initial',
                    minSize: 100,
                    minChunks: 1,
                },
                dayjs: {
                    name: 'dayjs',
                    priority: 5,
                    test: /[\/]node_modules[\/]dayjs[\/]/,
                    chunks: 'initial',
                    minSize: 100,
                    minChunks: 1,
                },
                moment: {
                    name: 'moment',
                    priority: 5,
                    test: /[\/]node_modules[\/]moment[\/]/,
                    chunks: 'initial',
                    minSize: 100,
                    minChunks: 1,
                },
                vendor: {
                    priority: 1,
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1,
                },
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', {
                                modules: false,
                                "useBuiltIns": "usage"
                            }]],
                            plugins: [require.resolve('react-refresh/babel')],
                        },
                    }
                ]
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        // options: {
                        //     presets: [['@babel/preset-env', {
                        //         modules: false,
                        //         useBuiltIns: 'usage',
                        //         corejs: 3
                        //     }]],
                        //     plugins: [require.resolve('react-refresh/babel')],
                        // },
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
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:6]',
                            },
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env']
                            },
                            sourceMap: true
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
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    emit: false,
                    publicPath: 'assets/',
                },
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        // new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack5-react',
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'html/app.html',
            chunks: ['app'],
        }),
        new HtmlWebpackPlugin({
            title: 'webpack5-react-test',
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'html/test.html',
            chunks: ['test', 'vendors'],
        }),
        // new BundleAnalyzerPlugin(),
    ],
    devtool: 'hidden-source-map'
});

webpackConfig.plugins.push(new MiniCssExtractPlugin({
    filename: 'css/[name].[hash:6].css',
    chunkFilename: 'css/[name].bundle.[hash:6].css',
}))

module.exports = webpackConfig;
