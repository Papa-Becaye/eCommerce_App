import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import sendEmail from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken";

export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json(
            { 
                message: "name, email, password are required",
                error: true,
                success: false
            });
        }
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json(
            { 
                message: "user already exists",
                error: true,
                success: false
            });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const payload = new UserModel({
            name,
            email,
            password: hashPassword
        });

        const newUser = new UserModel(payload);
        const savedUser = await newUser.save();

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser?._id}`;


        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: 'Welcome to our platform',
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        });

        return res.json(
        {
            message: "user registered successfully",
            error: false,
            success: true,
            data: savedUser
        });

    } catch (error) {
        return res.status(500).json(
        { 
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function verifyEmailController(req, res) {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json(
            { 
                message: "code is required",
                error: true,
                success: false
            });
        }
        const user = await UserModel.findOne({ _id : code });
        if (!user) {
            return res.status(400).json(
            { 
                message: "user not found",
                error: true,
                success: false
            });
        }
        if (user.verify_email) {
            return res.status(400).json(
            { 
                message: "email already verified",
                error: true,
                success: false
            });
        }
        const updatedUser = await UserModel.updateOne({ _id: code}, { verify_email: true });
        return res.json(
        {
            message: "email verified successfully",
            error: false,
            success: true,
            data: updatedUser
        });

    } catch (error) {
        return res.status(500).json(
        { 
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json(
            { 
                message: "email, password are required",
                error: true,
                success: false
            });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json(
            { 
                message: "user not registered",
                error: true,
                success: false
            });
        }

        if (user.status !== 'Active') {
            return res.status(400).json(
            { 
                message: "account is not active, contact to admin.",
                error: true,
                success: false
            });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(
            { 
                message: "check your email or password",
                error: true,
                success: false
            });
        }

        const token = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);
        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }

        res.cookie('AccessToken', token, cookiesOptions);
        res.cookie('RefreshToken', refreshToken, cookiesOptions);
        return res.json(
        {
            message: "user logged in successfully",
            error: false,
            success: true,
            data: {
                token,
                refreshToken
            }
        });

    } catch (error) {
        return res.status(500).json(
        { 
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function logoutUserController(req, res) {
    try {

        const userid = req.userId;
        console.log(userid);

        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }
        res.clearCookie('AccessToken', cookiesOptions);
        res.clearCookie('RefreshToken', cookiesOptions);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, { refresh_token: ""});

        return res.json(
        {
            message: "user logged out successfully",
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json(
        { 
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function uploadUserAvatarController(req, res) {
    try {
        const image = req.file;
        const upload = await uploadImageCloudinary(image);
        const userid = req.userId;

        const updateUser = await UserModel.findByIdAndUpdate(userid, { 
            avatar: upload.url 
        });
        return res.json(
        {
            message: "image uploaded successfully",
            error: false,
            success: true,
            data: {
                avatar: upload.url,
                _id: updateUser._id
            }
        });

    } catch (error) {
        return res.status(500).json(
        { 
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function updateUserDetailsController(req, res) {
    try {
        const userid = req.userId;
        const { name, email, mobile, password } = req.body;
        let hashPassword = "";
        if (password) {
            const salt = await bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password, salt);
        }
        const updatedUser = await UserModel
        .updateOne({_id: userid}, { 
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: hashPassword })

        }, { new: true });
        return res.json(
        {
            message: "user details updated successfully",
            error: false,
            success: true,
            data: updatedUser
        });

    } catch (error) {
        return res.status(500).json(
        { 
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json(
            { 
                message: "email is required",
                error: true,
                success: false
            });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json(
            { 
                message: "user not registered",
                error: true,
                success: false
            });
        }
        const otp = generateOtp();
        const expireTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes

        const updatedUser = await UserModel.findByIdAndUpdate( user._id , { 
            forgot_password_otp: otp,
            forgot_password_expiry: new Date(expireTime).toISOString()
        });

        await sendEmail({
            sendTo: email,
            subject: 'Forgot Password OTP from our platform',
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp
            })
        });
        return res.json(
        {
            message: "otp sent to your email",
            error: false,
            success: true,
        });

    } catch (error) {
        return res.status(500).json(
        { 
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function verifyOtpController(req, res) {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json(
            { 
                message: "email, otp are required",
                error: true,
                success: false
            });
        }
        
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json(
            { 
                message: "user not registered",
                error: true,
                success: false
            });
        }
        
        const currentTime = new Date().toISOString();
        if (currentTime > user.forgot_password_expiry) {
            return res.status(400).json(
            { 
                message: "otp expired",
                error: true,
                success: false
            });
        }
        if (user.forgot_password_otp !== otp) {
            return res.status(400).json(
            { 
                message: "otp not matched",
                error: true,
                success: false
            });
        }
        
        return res.json(
        {
            message: "otp verified successfully",
            error: false,
            success: true,
        });

    } catch (error) {
        return res.status(500).json(
        { 
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function resetPasswordController(req, res) {
    try {
        const { email, newPassword, confirmPassword } = req.body;
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json(
            { 
                message: "email, newPassword, confirmPassword are required",
                error: true,
                success: false
            });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json(
            { 
                message: "user not registered",
                error: true,
                success: false
            });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json(
            { 
                message: "password not matched",
                error: true,
                success: false
            });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword, salt);

        const updatedUser = await UserModel.findByIdAndUpdate( user._id , { 
            password: hashPassword,
            forgot_password_otp: "",
            forgot_password_expiry: ""
        });
        return res.json(
        {
            message: "password reset successfully",
            error: false,
            success: true,
        });

    } catch (error) {
        return res.status(500).json(
        { 
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function refreshTokenController(req, res) {
    try {
        const refreshToken = req.cookies.RefreshToken || req?.header?.authorization?.split(' ')[1]; // [bearer token]
        if (!refreshToken) {
            return res.status(401).json(
            { 
                message: "Invalid token",
                error: true,
                success: false
            });
        }
        
        const verifiedToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
        if (!verifiedToken) {
            return res.status(401).json(
            { 
                message: "Token is expired",
                error: true,
                success: false
            });
        }

        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }

        const newAccessToken = await generateAccessToken(verifiedToken?.id);
        res.cookie('AccessToken', newAccessToken, cookiesOptions);
        return res.json(
        {
            message: "token refreshed successfully",
            error: false,
            success: true,
            data: {
                token: newAccessToken
            }
        });

    } catch (error) {
        return res.status(500).json(
        { 
            message: error.message || error,
            error: true,
            success: false
        });
    }
}