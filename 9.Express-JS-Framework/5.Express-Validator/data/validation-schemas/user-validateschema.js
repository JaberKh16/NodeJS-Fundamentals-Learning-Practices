const schema = {};
schema.createUserSchema = {
    isLength: {
        options: {
            min: 3,
            max: 10,
        },
        errorMessage: 'Must be 3-10 characters long.',
    },
    isString: {
        errorMessage: 'Must be a string',
    },
};
