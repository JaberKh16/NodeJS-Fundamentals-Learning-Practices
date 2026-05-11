// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const indexRouter = Router();

indexRouter.get('/', (req, res) => {
    res.send('Welcome');
});
