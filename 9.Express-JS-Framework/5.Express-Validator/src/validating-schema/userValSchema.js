const userSchema = {
    userName: {
        isString: {
            errorMessage: "must be a string"
        },
        isLength: {
            options: { min: 2, max: 10 },
            errorMessage: "must be at least 2-10 characters long"
        },
        notEmpty: {
            errorMessage: "must be a required field"
        }
    },
    displayName: {
        isString: {
            errorMessage: "must be a string"
        },
        isLength: {
            options: { min: 2, max: 10 },
            errorMessage: "must be at least 2-10 characters long"
        },
        notEmpty: {
            errorMessage: "must be a required field"
        }
    }
};

module.exports = { userSchema };
