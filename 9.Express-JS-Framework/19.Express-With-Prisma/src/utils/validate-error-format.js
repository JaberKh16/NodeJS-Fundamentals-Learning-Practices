// validator.utils.js
import { ZodError } from 'zod';

export const formatZodErrors = (error) => {
    if (error instanceof ZodError) {
        return error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code
        }));
    }
    return [];
};

export const validateRequest = (schema) => {
    return (req, res, next) => {
        const validation = schema.safeParse(req.body);
        
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: formatZodErrors(validation.error)
            });
        }
        
        req.validatedData = validation.data;
        next();
    };
};