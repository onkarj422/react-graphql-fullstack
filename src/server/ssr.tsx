/* eslint-disable no-console */
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { ChunkExtractor } from '@loadable/server';
import { Helmet } from 'react-helmet';
import chalk from 'chalk';
import { Request, Response, NextFunction } from 'express';

import renderHtml from './renderHtml';
import routes from '../routes';

export default async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    // The method for loading data from server-side
    // const loadBranchData = (): Promise<any> => {
    //   // @ts-expect-error
    //   const branch = matchRoutes(routes, req.path);
    //   const promises = branch.map(({ route, match }) => {
    //     if (route.loadData)
    //       return Promise.all(
    //         route
    //           .loadData({
    //             params: match.params,
    //             getState: store.getState,
    //             req,
    //             res,
    //           })
    //           .map((item: Action) => store.dispatch(item))
    //       );

    //     return Promise.resolve(null);
    //   });

    //   return Promise.all(promises);
    // };

    try {
        // Load data from server-side first
        // await loadBranchData();

        const statsFile = path.resolve(
            process.cwd(),
            'public/loadable-stats.json',
        );
        const extractor = new ChunkExtractor({ statsFile });

        const staticContext: Record<string, any> = {};
        const App = extractor.collectChunks(
            <StaticRouter location={req.path} context={staticContext}>
                {/*
          // @ts-expect-error */}
                {renderRoutes(routes)}
            </StaticRouter>,
        );

        const htmlContent = renderToString(App);
        // head must be placed after "renderToString"
        // see: https://github.com/nfl/react-helmet#server-usage
        const head = Helmet.renderStatic();

        // Check if the render result contains a redirect, if so we need to set
        // the specific status and redirect header and end the response
        if (staticContext.url) {
            res.status(301).setHeader('Location', staticContext.url);
            res.end();

            return;
        }

        // Check page status
        const status = staticContext.status === '404' ? 404 : 200;

        // Pass the route and initial state into html template
        res.status(status).send(renderHtml(head, extractor, htmlContent));
    } catch (error) {
        res.status(404).send('Not Found :(');

        console.error(chalk.red(`==> 😭  Rendering routes error: ${error}`));
    }

    next();
};
