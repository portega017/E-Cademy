const helpers = require('../lib/helpers');

module.exports = {
    async isAdmin(req, res, next) {
        
        if (await helpers.isAdmin(req.user.id_rol)) {
            return next();
        }
        return res.redirect('/courses')
    },

    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin')
    },
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/courses')

    }
};