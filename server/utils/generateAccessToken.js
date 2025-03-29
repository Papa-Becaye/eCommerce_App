import jwt from "jsonwebtoken";

const generateAccessToken = (userId) => {
    const accessToken = jwt.sign({ id : userId },
        process.env.SECRET_KEY_ACCESS_TOKEN, 
        { expiresIn: "5h" }
    );

    return accessToken;
}

export default generateAccessToken;
// The generateAccessToken function generates an access token using the jwt.sign method. It takes the userId as an argument and returns the access token with a 5-hour expiration time.