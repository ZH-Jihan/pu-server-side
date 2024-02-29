const jwt = require("jsonwebtoken");
const {promisify} = require("util")

/**
 * 1. check if token exist
 * 2. if not token send res
 * 3. decode the token
 * 4. if valid next
 */

module.exports = async (req,res,next) => {
    console.log(req);
    try {
        const token = req.cookies?.accesToken;
        // const token = req.headers?.cookie?.split("=")?.[1]
        
        if (!token) {
            return res.status(401).json({
                status: "fail",
                error: "You are not logged In"
            });
        }

        const decode = await promisify(jwt.verify)(token,process.env.ACCESS_TOKEN_SECRET);

        req.user = decode;

        next();

    } catch (error) {
        res.status(403).json({
            status: "fail",
            error: "Invalid token"
        })
    }
 }