const userValidationSchema = {
    userName: {
        optional: true,
        isString: {
            errorMessage: 'Username must be a string',
        },
        isLength: {
            options: {
                min: 2,
                max: 10,
            },
            errorMessage: 'Username must be between 2 and 10 characters',
        },
        escape: true,
        trim: true,
    },
    displayName: {
        optional: true,
        isString: {
            errorMessage: 'Display name must be a string',
        },
        isLength: {
            options: {
                min: 2,
                max: 10,
            },
            errorMessage: 'Display name must be between 2 and 10 characters',
        },
        escape: true,
        trim: true,
    },
    email: {
        notEmpty: {
            errorMessage: 'Email is a required field',
        },
        isString: {
            errorMessage: 'Email must be a string',
        },
        isEmail: {
            errorMessage: 'Email must be a valid email address',
        },
        isLength: {
            options: {
                min: 5,
                max: 50,
            },
            errorMessage: 'Email must be between 5 and 50 characters',
        },
        escape: true,
        trim: true,
    },
    password: {
        notEmpty: {
            errorMessage: 'Password is a required field',
        },
        isString: {
            errorMessage: 'Password must be a string',
        },
        isLength: {
            options: {
                min: 6,
                max: 20,
            },
            errorMessage: 'Password must be between 6 and 20 characters',
        },
        escape: true,
        trim: true,
    },
};

module.exports = userValidationSchema;
