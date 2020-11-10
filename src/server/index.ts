/* eslint-disable no-console */
import path from 'path';
import logger from 'morgan';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import favicon from 'serve-favicon';
// import chalk from 'chalk';

import devServer from './devServer';
// import ssr from './ssr';
// import api from './api';
// import config from '../config';

const app = express();

// Use helmet to secure Express with various HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));
// Prevent HTTP parameter pollution
app.use(hpp());
// Compress all requests
app.use(compression());

// Use for http request debug (show errors only)
app.use(logger('dev', { skip: (_, res) => res.statusCode < 400 }));
app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));

// Enable dev-server in development
devServer(app);
