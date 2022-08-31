function authMiddlewareParams(req, res, next) {
    const user = req.session.userLogged
    const params = req.params
    if ((!user && params) || (user && user.name != params.name)&& (user.permission_id != 1)) {
        return res.redirect('/users/error');
    }
    next();
}

module.exports = authMiddlewareParams;