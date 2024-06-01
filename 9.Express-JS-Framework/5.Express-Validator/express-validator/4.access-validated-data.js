/*
    Accessing Validating Data
    =========================
    Express validator provides a matchedData() function to access the validated data.

*/
const express = require('express');
const { query, matchedData, validationResult } = require('express-validator');

const app = express();

app.use(express.json());
app.get('/data', query('person').notEmpty().escape(), (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });    
    }
    const data = matchedData(req);
    console.log(data);
    return res.send(`Hello, ${data.person}!`);
    
});

app.listen(3000);
