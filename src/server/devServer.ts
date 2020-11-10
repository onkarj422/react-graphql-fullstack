/* eslint-disable no-console */
import express, { Express } from 'express';
import chalk from 'chalk';

import config from '../config';

export default (app: Express): void => {
    let isBuilt = false;

    const done = () =>
        !isBuilt &&
        app.listen(3000, () => {
            isBuilt = true;
            const url = `http://${config.HOST}:${config.PORT}`;
            console.info(chalk.green(`==> 🌎  Listening at ${url}`));
        });

    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
    const clientConfig = require('../../tools/webpack/config.client');
    const serverConfig = require('../../tools/webpack/config.server');
    const { publicPath } = clientConfig.output;
    const { path: outputPath } = clientConfig.output;
    if (__DEV__) {
        const compiler = webpack([clientConfig, serverConfig]);
        const clientCompiler = compiler.compilers[0];
        const options = { publicPath, stats: { colors: true } };
        const devMiddleware = webpackDevMiddleware(compiler, options);

        app.use(devMiddleware);
        app.use(webpackHotMiddleware(clientCompiler));
        app.use(webpackHotServerMiddleware(compiler));

        devMiddleware.waitUntilValid(done);
    } else {
        webpack([clientConfig, serverConfig]).run((_err: any, stats: any) => {
            const clientStats = stats.toJson().children[0];
            const serverRender = require('../../public/server/main.js').default;

            app.use(publicPath, express.static(outputPath));
            app.use(serverRender({ clientStats }));

            done();
        });
    }

    // app.use(
    //     require('webpack-hot-middleware')(compiler, {
    //         log: false,
    //         path: '/__webpack_hmr',
    //         heartbeat: 10 * 1000,
    //     }),
    // );
};
