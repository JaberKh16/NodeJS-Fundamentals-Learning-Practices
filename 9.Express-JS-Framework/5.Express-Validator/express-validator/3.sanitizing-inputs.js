/*
    Sanitization In Express Validator
    =================================
    While the user can no longer send empty person names, it can still inject HTML into your page! This is known as the Cross-Site Scripting
    vulnerability (XSS).

    Let's see how it works. Go to http://localhost:3000/hello?person=<b>John</b>, and you should see "Hello, John!".

    While this example is fine, an attacker could change the person query string to a <script> tag which loads its own JavaScript that 
    could be harmful.

    In this scenario, one way to mitigate the issue with express-validator is to use a sanitizer, most specifically escape, which transforms 
    special HTML characters with others that can be represented as text.

    escape() function is provided by express validator to defend XSS attack.
*/

const express = require('express');
const { query, validationResult } = require('express-validator');
const app = express();

app.use(express.json());

app.get('/message', query('person').notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
  }

  res.send({ errors: result.array() });
});

app.listen(3000); 