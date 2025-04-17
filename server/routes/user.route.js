import { Router } from "express";
import auth from '../middleware/auth.js';
import {
    registerUserController,
    verifyEmailController,
    loginUserController, 
    logoutUserController,
    uploadUserAvatarController,
    updateUserDetailsController,
    forgotPasswordController,
    verifyOtpController,
    resetPasswordController,
    refreshTokenController,
    getUserDetailsController
} from '../controllers/user.controller.js';
import upload from "../middleware/multer.js";

const userRouter = Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginUserController);
userRouter.get('/logout', auth, logoutUserController);
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadUserAvatarController);
userRouter.put('/update-user', auth, updateUserDetailsController);
userRouter.put('/forgot-password', forgotPasswordController);
userRouter.put('/verify-forgot-password-otp', verifyOtpController);
userRouter.put('/reset-password', resetPasswordController);
userRouter.post('/refresh-token', refreshTokenController);
userRouter.get('/user-details', auth, getUserDetailsController);

export default userRouter;
// The user route defines the user routes and exports the userRouter.