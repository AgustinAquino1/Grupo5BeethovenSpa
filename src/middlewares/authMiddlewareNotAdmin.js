function authMiddlewareNotAdmin(req, res, next) {
    const user = req.session.userLogged
    if (!user || (user && user.permission_id != 1)) {
        return res.redirect('/users/error');
    }
    next();
}

module.exports = authMiddlewareNotAdmin;