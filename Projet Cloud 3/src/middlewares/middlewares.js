const authPage = (permissions) => {
    return (req, res, next) => {
        const userRole = req.body.role;
        if (permissions.includes(userRole)) {
            next();
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    };
};

module.exports = authPage;
