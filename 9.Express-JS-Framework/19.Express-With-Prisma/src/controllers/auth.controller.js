
import { prisma } from '../config/db.js';
import { generateToken } from '../utils/generate-token-helper.js';
import { userRegisterSchema, userLoginSchema } from '../validators/user.validator.js';


export const handleRegister = async (req, res) => {
    // process the rquested data
    try {
        const validation = userRegisterSchema.safeParse(req.body);
        if(!validation.success){
            return res.stauts(400).json({
                status: 400,
                success: false,
                error: 'Validation failed',
                details: validation.error.issues.map(err=> ({
                    fields: err.path.join('.'),
                    message: err.message
                }))

            })
        }
        const validatedData = validation.data;
        const { name, email, password } = validatedData;

        // validate data
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: "Name, email, and password are required"
            });
        }

        // ... rest of the registration logic
        // check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "User with this email already exists"
            });
        }

        // create new user
        // hash the password before storing (not implemented here for simplicity)
        // const hashedPassword = await bcrypt.hash(password, 10);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });

        return res.status(201).json({
            success: true,
            data: newUser
        });

    } catch (error) {
        console.error("Error occurred while registering user:", error);
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

export const handleLogin = async (req, res) => {
    try {
  
        const validation = userLoginSchema.safeParse(req.body);
        if(!validation.success){
            return res.stauts(400).json({
                status: 400,
                success: false,
                error: 'Validation failed',
                details: validation.error.issues.map(err=> ({
                    fields: err.path.join('.'),
                    message: err.message
                }))

            })
        }
        const validatedData = validation.data;
        const { email, password }  = validatedData;

        // check if user exists
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: "Invalid email or password"
            });
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                error: "Invalid email or password"
            });
        }

        // generate token (not implemented here for simplicity)
        const token = generateToken(user, res);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });
    } catch (error) {
        console.error("Error occurred while logging in user:", error);
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}


export const handleLogout = async (req, res) => {
    try {
        // clear the token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });

    } catch (error) {
        console.error("Error occurred while logging out user:", error);
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}

