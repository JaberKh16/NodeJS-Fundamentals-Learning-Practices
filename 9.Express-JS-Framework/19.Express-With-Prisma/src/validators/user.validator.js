import { z } from 'zod';

export const userValidationSchema = z.object({
    name: z.string()
        .min(2, 'name must be atleast 2 characters')
        .max(50, 'name must not exceed 50 characters')
        .trim(),

    email: z.string()
        .email('please provide a valid email address')
        .toLowerCase()
        .trim(),
    
    age: z.number()
        .int('age must be a whole number')
        .min(18, 'You must be at least 18 years old')
        .max(120, 'Invalid age')
        .optional()
        .nullable(),

    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase, one lowercase, and one number'
        )

});

// User update validation schema (partial)
export const userUpdateSchema = userValidationSchema.partial();


// Login validation schema
export const userLoginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required')
});

// Custom validation for query parameters
export const userQuerySchema = z.object({
    page: z.string()
        .optional()
        .default('1')
        .transform(Number)
        .pipe(z.number().int().positive()),
    
    limit: z.string()
        .optional()
        .default('10')
        .transform(Number)
        .pipe(z.number().int().min(1).max(100)),
    
    search: z.string().trim().optional()
});

// Type inference (for TypeScript)
// export type UserRegisterInput = z.infer<typeof userRegisterSchema>;