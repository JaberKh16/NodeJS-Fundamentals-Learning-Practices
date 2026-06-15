const userValidationSchema = {
    first_name: {
        isString: {
            errorMessage: 'Firstname must be a string',
        },
        isLength: {
            options: {
                min: 3,
                max: 15,
            },
            errorMessage: 'FirstName must be between 3-15 chracters long.',
        },
        trim: true,
        escape: true,
    },
    last_name: {
        isString: {
            errorMessage: 'Lastname must be a string',
        },
        isLength: {
            options: {
                min: 3,
                max: 15,
            },
            errorMessage: 'LastName must be between 3-15 chracters long.',
        },
        trim: true,
        escape: true,
    },
    email: {
        isString: {
            errorMessage: 'Email must be a string',
        },
        isLength: {
            options: {
                max: 25,
            },
            errorMessage: 'Email must be between 25 chracters long.',
        },
        isEmail: {
            errorMessage: 'Email must be a valid email',
        },
        trim: true,
        escape: true,
    },
    gender: {
        isString: {
            errorMessage: 'Gender must be a string',
        },
        isLength: {
            options: {
                min: 1,
                max: 10,
            },
            errorMessage: 'Gender must be between 1-10 chracters long.',
        },
        trim: true,
        escape: true,
    },
    ip_address: {
        optional: true,
        isIP: {
            errorMessage: 'A valid IP address is required',
        },
    },
};

module.exports = userValidationSchema;
