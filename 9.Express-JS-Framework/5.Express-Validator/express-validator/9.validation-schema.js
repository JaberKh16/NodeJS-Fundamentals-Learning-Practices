/*
    Schema Validation Concept
    =========================
    Schemas are an object-based way of defining validations or sanitizations
    on requests. They offer exactly the same functionality as regular validation
    chains - in fact, under the hood, express-validator deals all in validation
    chains!

    If you don't like the idea of specifying your validations using
    JavaScript functions, and instead prefer an even more declarative
    approach, then schema validations might be the right
    express-validator tool for you.

    Schemas are plain JavaScript objects that you pass to the checkSchema() function,
    where you specify which fields to validate as the keys, and the schema of the
    field as the value.

    In turn, the field schemas contain the validators, sanitizers, and any options
    to modify the behavior of the internal validation chain.

*/

const userSchema = () => {
    {
        username: {
            errorMessage: 'Invalid username',
            isEmail: true,
        },
        password: {
            isLength: {
                options: { min: 8 },
                errorMessage: 'Password should be at least 8 chars',
            },
        },
    };
};
