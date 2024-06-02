const userSchema = () => {
    {
        userName: {
            isString: true,
            isLength:{
                options:{
                    min:2, 
                    max:10
                },
                errorMessage: "must be aleast 2-10 characters long"
            },
            notEmpty:{
                errorMessage: "must required field"
            }
        },
        displayName: {
            isLength: {
                options: { min: 2, 10 },
                errorMessage: 'must be aleast 2-10 characters long'
            },
            isString:{
                errorMessage:"must be a string"
            },
            notEmpty:{
                errorMessage:"must required field"
            }
        }
        
    }; 
};


module.exports = userSchema;