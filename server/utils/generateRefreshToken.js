import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const generateRefreshToken = async (userId) => {
    const refreshToken = jwt.sign({ id : userId },
        process.env.SECRET_KEY_REFRESH_TOKEN, 
        { expiresIn: "7d" }
    );

    const updateRefreshTokenUser = await UserModel.updateOne({ _id: userId}, { refresh_token: refreshToken });

    return refreshToken;
}

export default generateRefreshToken;
// The generateRefreshToken function generates a refresh token using the jwt.sign method. It takes the userId as an argument and returns the refresh token with a 7-day expiration time.