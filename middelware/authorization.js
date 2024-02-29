module.exports.rolebase= (...role) =>{
    return (req,res,next) =>{
        const userRole = req.user.role;
        if (!role.includes(userRole)) {
            return res.status(403).json({
                status:"fail",
                error: "Your Role not authorized to access this"
            });
        }
        next();
    };
};

module.exports.menubase= (menuName) =>{
    
    return (req,res,next) =>{
        
        const userRole = req.user.permission;

        if (!userRole.includes(menuName)) {
            return res.status(403).json({
                status:"Permission fail",
                error: "You are not Permission to access this"
            });
        }
        next();
    };
};