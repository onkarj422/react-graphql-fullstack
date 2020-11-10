const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

const res = p => path.resolve(__dirname, p);

const nodeModules = res('../../node_modules');
const entry = res('../../src/server/ssr.tsx');
const output = res('../../public/server');

const isDev = process.env.NODE_ENV !== 'production';

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
    .readdirSync(nodeModules)
    .filter(
        x =>
            !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(
                x,
            ),
    )
    .reduce((externals, mod) => {
        externals[mod] = `commonjs ${mod}`;
        return externals;
    }, {});

const getStyleLoaders = (sass = false) =>
    [
        {
            loader: 'css-loader',
            options: {
                importLoaders: sass ? 2 : 1,
                modules: {
                    auto: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                    exportOnlyLocals: true
                },
            },
        },
        { loader: 'postcss-loader', options: { sourceMap: isDev } },
        sass && { loader: 'sass-loader', options: { sourceMap: isDev } },
    ].filter(Boolean);

module.exports = {
    name: 'server',
    target: 'node',
    mode: isDev ? 'development' : 'production',
    devtool: 'source-map',
    // devtool: 'eval',
    entry: [entry],
    externals,
    output: {
        path: output,
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        publicPath: '/public/',
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: getStyleLoaders(),
            },
            {
                test: /\.(scss|sass)$/,
                use: getStyleLoaders(true),
            },
            {
                test: /\.(gif|png|jpe?g|webp|svg)$/,
                use: [
                    {
                        // Any image below or equal to 10K will be converted to inline base64 instead
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            name: '[name].[contenthash:8].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        // For each optimizer you wish to configure
                        // Plz check https://github.com/tcoopman/image-webpack-loader#usage
                        options: { disable: true },
                    },
                ],
            },
        ],
    },
    plugins: [
        isDev && new WriteFilePlugin(),
        !isDev && new webpack.optimize.ModuleConcatenationPlugin(),
        !isDev && new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __DEV__: isDev,
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
    ].filter(Boolean),
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
};
