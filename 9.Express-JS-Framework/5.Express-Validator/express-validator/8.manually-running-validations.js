/*
    Manually Running Validations Concept
    ====================================
   'express-validator' favors the declarative way of doing things that express
   middlewares bring. This means most of the APIs look and work better when
   simply passed into an express route handler.

    You can, however, take control of running these validations into your own
    middleware/route handler.

    This is possible in express-validator functions which return an object
    which implements the ContextRunner, an interface implemented by all
    of ValidationChain, checkExact(), checkSchema() and oneOf.

*/

const express = require('express');
const { validationResult } = require('express-validator');
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
const validate = validations => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

app.post('/signup', validate([
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
]), async (req, res, next) => {
  // request is guaranteed to not have any validation errors.
  const user = await User.create({ ... });
});

// validating with a condition
import { body, matchedData } from 'express-validator';
app.post(
  '/update-settings',
  body('email').isEmail(),
  body('password').optional().isLength({ min: 6 }),
  async (req, res, next) => {
    // if a password has been provided, then a confirmation must also be provided.
    const { password } = matchedData(req);
    if (password) {
      await body('passwordConfirmation')
        .equals(password)
        .withMessage('passwords do not match')
        .run(req);
    }

    // Check the validation errors, and update the user's settings.
  },
);