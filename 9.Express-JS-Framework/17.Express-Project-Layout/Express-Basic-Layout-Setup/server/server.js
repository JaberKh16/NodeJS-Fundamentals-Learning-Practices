// index.js
// eslint-disable-next-line import/extensions
import { appCreate, appRun } from './core/app.js';
// eslint-disable-next-line import/extensions
import { indexRouter } from './routes/index.js';

// create the app
const app = appCreate();

// setup router
app.use('/', indexRouter);

// run the app
appRun(app);
