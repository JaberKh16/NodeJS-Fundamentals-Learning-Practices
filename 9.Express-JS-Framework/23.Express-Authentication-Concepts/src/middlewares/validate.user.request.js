export const validateUserRequest = (schema) => {
    return (req, res, next) => {
        try {
            // schema.parse(req.body);
            const result = schema.safeParse(req.body);
            if (!result.success) {
                const errors = result.error.errors.map(err => `${err.path.join('.')} - ${err.message}`);
                return res.status(400).json({ error: errors });
            }
            next();
        } catch (error) {
            return res.status(400).json({ error: error.errors ? error.errors : error.message });
        }
    }
}


export const validateUserRequestOtherWay = (schema) => {
    return (req, res, next) => {
        try {
            // schema.parse(req.body);
            const result = schema.safeParse(req.body);
            if (!result.success) {
               const formatted = result.error.format();
               const errors = Object.keys(formatted).map(key => {
                    const fieldErrors = formatted[key]._errors;
                    return fieldErrors.map(err => `${key} - ${err}`);
               }).flat();
                return res.status(400).json({ error: errors });
            }
            next();
        } catch (error) {
            return res.status(400).json({ error: error.errors ? error.errors : error.message });
        }
    }
}