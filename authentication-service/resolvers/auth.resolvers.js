import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
export const register = async (_, { registerInput }) => {
    if (
        !registerInput.username ||
        !registerInput.password ||
        !registerInput.role
    ) {
        return {
            isSuccess: false,
            message: "Missing required fields",
        };
    }
    if (
        registerInput.role.toLowerCase() !== "nurse" ||
        registerInput.role.toLowerCase() !== "patient"
    ) {
        return {
            isSuccess: false,
            message: "Role must be nurse or patient",
        };
    }
    const foundUser = await User.findOne({ username: registerInput.username });
    if (foundUser) {
        return {
            isSuccess: false,
            message: "Username already existed",
        };
    }
    const hashedPassword = await bcrypt.hash(registerInput.password, 10);
    const newUser = new User({ ...registerInput, password: hashedPassword });
    await newUser.save();
    return { isSuccess: true, message: "User is created successfully" };
};
export const login = async (_, { loginInput }, { res }) => {
    if (!loginInput.username || !loginInput.password) {
        return {
            isSuccess: false,
            message: "Missing required fields",
        };
    }
    const foundUser = await User.findOne({ username: loginInput.username });
    if (!foundUser) {
        return {
            isSuccess: false,
            message: "Username does not exist",
        };
    }
    const isPasswordMatch = await bcrypt.compare(
        loginInput.password,
        foundUser.password
    );
    if (!isPasswordMatch) {
        return {
            isSuccess: false,
            message: "Password is incorrect",
        };
    }
    const secretToken = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = jwt.sign(
        {
            userId: foundUser.id,
            role: foundUser.role,
        },
        secretToken,
        { expiresIn: "30m" }
    );
    res.cookie("jwt", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
    });
    return {
        isSuccess: true,
        message: "Login successfully",
        token: accessToken,
    };
};
export const logout = (_, __, { res }) => {
    res.clearCookie("jwt");
    return {
        isSuccess: true,
        message: "Logout successfully",
    };
};
export const validateToken = async (_, __, { req, res }) => {
    const token = req.cookies["jwt"];
    if (!token) {
        return { isSuccess: false, message: "Token is empty" };
    }
    try {
        const secretToken = process.env.ACCESS_TOKEN_SECRET;
        const decoded = jwt.verify(token, secretToken);
        if (!decoded.userId || !decoded.role) {
            return { isSuccess: false, message: "Token is invalid" };
        }
        const foundUser = await User.findById(decoded.userId);
        if (!foundUser) {
            return { isSuccess: false, message: "User does not exist" };
        }
        if (foundUser.role !== decoded.role) {
            return { isSuccess: false, message: "Role does not match" };
        }
        return { isSuccess: true, message: "Token is valid" };
    } catch (error) {
        res.clearCookie("jwt");
        return { isSuccess: false, message: "Token is expired" };
    }
};
