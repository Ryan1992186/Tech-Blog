const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/signup');
    } else {
        next();
    }
};

module.exports = withAuth;