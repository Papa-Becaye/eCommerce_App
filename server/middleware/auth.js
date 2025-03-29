import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
    try {
        const token = req.cookies.AccessToken || req.headers.authorization?.split(" ")[1]; // Get token from cookies or headers [Bearer token]
        if (!token) {
            return res.status(401).json({
                message: "provide token",
                error: true,
                success: false
            });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized",
                error: true,
                success: false
            });
        }
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
export default auth;