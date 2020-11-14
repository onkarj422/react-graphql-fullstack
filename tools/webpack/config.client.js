const path = require('path');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

// Loaders for CSS and SASS
const getStyleLoaders = (sass = false) =>
    [
        {
            loader: ExtractCssChunks.loader,
            options: {
                hmr: isDev,
                reloadAll: true,
            },
        },
        {
            loader: 'css-loader',
            options: {
                importLoaders: sass ? 2 : 1,
                modules: {
                    auto: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                },
            },
        },
        { loader: 'postcss-loader', options: { sourceMap: isDev } },
        sass && { loader: 'sass-loader', options: { sourceMap: isDev } },
    ].filter(Boolean);

// Webpack configuration
module.exports = {
    name: 'client',
    target: 'web',
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval-source-map' : false,
    stats: 'minimal',
    context: path.resolve(process.cwd()),
    entry: [
        isDev &&
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
        isDev && 'react-hot-loader/patch',
        './src/client',
    ].filter(Boolean),
    optimization: {
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
        splitChunks: {
            // Auto split vendor modules in production only
            chunks: isDev ? 'async' : 'all',
        },
    },
    output: {
        path: path.resolve(__dirname, '../../public/client'),
        publicPath: '/public/',
        filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
        chunkFilename: isDev ? '[id].js' : '[id].[contenthash:8].js',
        pathinfo: isDev,
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            // All output '.js' files will have any sourcemaps re-processed by source-map-loader.
            // So you can debug your output code as if it was Typescript.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
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
                test: /\.(woff2?|ttf|otf|eot)$/,
                loader: 'file-loader',
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
        new ExtractCssChunks(),
        // new MiniCssExtractPlugin({
        //     // Don't use hash in development, we need the persistent for "renderHtml.ts"
        //     filename: isDev ? '[name].css' : '[name].[contenthash:8].css',
        //     chunkFilename: isDev ? '[id].css' : '[id].[contenthash:8].css',
        // }),
        isDev && new webpack.NamedModulesPlugin(), // only needed when server built with webpack
        isDev && new webpack.HotModuleReplacementPlugin(),
        isDev && new webpack.NoEmitOnErrorsPlugin(),
        !isDev && new webpack.optimize.ModuleConcatenationPlugin(),
        !isDev && new webpack.optimize.OccurrenceOrderPlugin(),
        // Setup global variables for client
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __DEV__: isDev,
        }),
        new webpack.ProgressPlugin(),
        // Runs typescript type checker on a separate process
        isDev && new ForkTsCheckerWebpackPlugin(),
        !isDev && new webpack.HashedModuleIdsPlugin(),
        !isDev &&
            new CompressionPlugin({
                test: /\.(js|css|html)$/,
                threshold: 10240,
            }),
        // Visualize all of the webpack bundles
        // Check "https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin" for more configurations
        !isDev &&
            new BundleAnalyzerPlugin({
                analyzerMode:
                    process.env.NODE_ENV === 'analyze' ? 'server' : 'disabled',
            }),
    ].filter(Boolean),
    resolve: {
        modules: ['src', 'node_modules'],
        descriptionFiles: ['package.json'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: { 'react-dom': '@hot-loader/react-dom' },
    },
};
