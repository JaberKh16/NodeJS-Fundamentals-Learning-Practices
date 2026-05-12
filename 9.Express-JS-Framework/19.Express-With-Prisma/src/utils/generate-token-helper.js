import jwt from "jsonwebtoken";

export const generateToken = (user, res) => {
    // setup payload and options for token
    const payload = {
        userId: user.id,
        email: user.email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1h" });


    // setup cookie options
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 // 1 hour
    };

    // set token in cookie
    res.cookie("token", token, cookieOptions);
    return token;
}