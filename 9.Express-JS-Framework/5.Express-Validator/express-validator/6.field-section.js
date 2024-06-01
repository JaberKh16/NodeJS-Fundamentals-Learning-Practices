/*
    Field Selection In Express Validator
    ====================================
    In 'express-validator', a field is any value that is either
    validated or sanitized.

    Pretty much every function or value returned by 'express-validator'
    reference fields in some way. For this reason, it is important to
    understand the field path syntax both for when selecting fields for
    validation and when accessing the validation errors or validated data.

    Syntax
    ------
    The path of a filed is always a string, which resembles how to reference
    it with pure js. See the following-
        1. Each word-like sequence of characters is a 'segment' which are like
           properties of a javascript object.
        2. Fields nested under objects can be selected by separating two segments with dot(.)
        3. Array indices can be selected by wrapping them in a square brackets.
        4. Segments with special characters such as . can be selected by wrapping in
           square brackets and double quotes.

        {
            "name": "John McExpress",
            "addresses": {
                "work": {
                    "country": "express-validator land"
                }
            },
            "siblings": [{ "name": "Maria von Validator" }],
            "websites": {
                "www.example.com": { "dns": "1.2.3.4" }
            }
        }

    WildCard Selection
    ------------------
    The wildcard can be used in place of any segment, which will correctly select 
    all indices of the array or keys of the object it's located in.

    Each matched field is returned as a different instance; that is, it's validated 
    or sanitized independently from the others. If the array or object that 
    the wildcard is placed in is empty, then nothing is validated.

        {
            "addresses": {
                "home": { "number": 35 },
                "work": { "number": 501 }
            },
            "siblings": [{ "name": "Maria von Validator" }, { "name": "Checky McCheckFace" }]
        }
    // selecting through wildcard
    app.post(
        '/update-user',
        body('addresses.*.number').isInt(),
        body('siblings.*.name').notEmpty(),
        (req, res) => {
            // Handle request
        },
    );

    Globstars Selection
    -------------------
    Globstars extend wildcards to an infinitely deep level.
    They can be used when you have an unknown level of nested fields, 
    and want to validate/sanitize all them the same way.
    
    Globastar use (**) to target any field no matter what how deep it is
    in the request.

        
        {
            "name": "Team name",
            "teams": [{ "name": "Subteam name", "teams": [] }]
        }

    app.put('/update-chart', body('**.name').notEmpty(), (req, res) => {
        // Handle request
    });
