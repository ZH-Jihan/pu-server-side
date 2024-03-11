const jwt  = require("jsonwebtoken");

exports.generateToken = (userInfo) =>{
    const payload = {
        id: userInfo._id,
        email: userInfo.email,
        role: userInfo.role,
        permission : userInfo.permission
    };

    const token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: "3hr"
    });

    return token;
}