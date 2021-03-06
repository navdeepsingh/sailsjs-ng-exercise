/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

    _config: {
        actions: true,
        shortcuts: true,
        rest: true
    },

    login: function(req, res) {

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            if ( user.logins > 0 ) 
                message = 'Welcome back, '+ user.getFullName()
            else
                message = 'Login Successful';
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.send({
                  message: message,
                  user: user,
                  redirect : info.redirect
                });
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};

