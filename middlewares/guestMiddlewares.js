function guestMiddleware(req, res, next) {
    if (req.session.userLogged) {
        return res.redirect('/users/profile/'+req.session.userLogged.name);
    }
    next();
}

module.exports = guestMiddleware;