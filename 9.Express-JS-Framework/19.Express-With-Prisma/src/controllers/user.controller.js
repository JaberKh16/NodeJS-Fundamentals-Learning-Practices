import { userValidationSchema } from '../validators/user.validator.js';
import { prisma } from '../config/db.js';
import { hashedString } from '../utils/hash-string.js';
import { ZodError } from 'zod';


// Get all users
export const getUsers = async (req, res) => {
    try {
       const users = await prisma.user.findMany();
       res.status(200).json({
        success: true,
        data: users
       });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message
        });
    }
}

// get single user
export const getUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}




// create user
export const createUser = async (req, res) => {
    try {
        // Validate request body using zod
        const validation = userValidationSchema.safeParse(req.body);

        if (!validation.success) {
            // Use 'issues' instead of 'errors'
            const formattedErrors = {};
            validation.error.issues.forEach(err => {
                const field = err.path.join('.');
                if (!formattedErrors[field]) {
                    formattedErrors[field] = [];
                }
                formattedErrors[field].push(err.message);
            });

            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: formattedErrors,
                errors: validation.error.issues.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            });
        }

        const validatedData = validation.data;
        const { name, email, age, password } = validatedData;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: 'User with this email already exists'
            });
        }

        // Hash password
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
        const hashedPassword = await hashedString(password, saltRounds);

        const newUser = await prisma.user.create({
            data: { 
                name, 
                email, 
                age: age ? parseInt(age) : null, 
                password: hashedPassword 
            }
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser;

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: userWithoutPassword
        });

    } catch (error) {
        console.error('Create user error:', error);
        
        // Handle Zod validation errors (if not caught by safeParse)
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            });
        }
        
        // Handle Prisma unique constraint errors
        if (error.code === 'P2002') {
            return res.status(409).json({
                success: false,
                error: 'A user with this email already exists'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};


// update user
export const updateUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        // Validate request body using zod
        const validation = userValidationSchema.safeParse(req.body);

        if (!validation.success) {
            // Use 'issues' instead of 'errors'
            const formattedErrors = {};
            validation.error.issues.forEach(err => {
                const field = err.path.join('.');
                if (!formattedErrors[field]) {
                    formattedErrors[field] = [];
                }
                formattedErrors[field].push(err.message);
            });

            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: formattedErrors,
                errors: validation.error.issues.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            });
        }

        const validatedData = validation.data;
        const { name, email, age, password } = validatedData;

        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
        const hashedPassword = hashedString(password, saltRounds);

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {  
                name, 
                email, 
                age: age ? parseInt(age) : null, 
                password: hashedPassword 
            }
        });
        // Remove password from response
        const { password: _, ...userWithoutPassword } = updatedUser;

        res.status(200).json({
            success: true,
            data: userWithoutPassword
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

// delete user
export const deleteUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.user.delete({
            where: { id }
        });

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}