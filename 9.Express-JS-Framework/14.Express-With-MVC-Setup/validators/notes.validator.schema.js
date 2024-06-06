const notesStoreSchema = {
    title: {
        notEmpty:{
            errorMessage: 'Title is required',
        },
        isString: {
            errorMessage: 'Title must be a string',
        },
        isLength: {
            options: {
                min: 6,
                max: 30,
            },
            errorMessage: 'Title must be 6-30 characters long.',
        },
        trim: true,
        escape: true,
    },
    content: {
        notEmpty:{
            errorMessage: 'Content is required',
        },
        isString: {
            errorMessage: 'Content must be a string',
        },
        isLength: {
            options: {
                min: 10,
                max: 100,
            },
            errorMessage: 'Content must be 1-100 characters long.',
        },
        trim: true,
        escape: true,
    },
};

module.exports = notesStoreSchema;