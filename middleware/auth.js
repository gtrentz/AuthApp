function isAdmin(req, res, next) {
    const isAdmin = req.session.user && req.session.user.isAdmin; // Check if user is logged in and is admin
    if (isAdmin) {
        return next();
    } else {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
}

module.exports = { isAdmin };