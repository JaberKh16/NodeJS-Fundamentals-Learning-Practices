// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';
// eslint-disable-next-line import/extensions
import { loadConfig } from './config.js';

export function appCreate() {
    const app = express();
    app.set('config', loadConfig());
    // setup view with ejs
    app.set('view engine', 'ejs');
    app.set('views', 'client/views');

    // setup logger
    app.use(morgan('tiny'));

    // setup middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static('client/public'));
    return app;
}

export function appRun(app) {
    const config = app.get('config');
    app.listen(config.PORT, () => {
        // eslint-disable-next-line no-unused-expressions
        `Server running on port: http:://localhost:${config.PORT}`;
    });
}
