var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcryptjs');

passport.serializeUser(function(user, done) {
    //console.log('serializeUser: ' + user.id);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
     User.findById(id, function(err, user) {
     // console.log('deserializeUser: ' + user);
      done(null, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      var user = user;
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      } 

      bcrypt.compare(password, user.password, function (err, res) {
          if (!res)
            return done(null, false, {
              message: "Incorrect Password"
            });

          User.update(user.id, { logins: '1' }).then(console.log);

          // Find default menu of user assigned
          Menu.findOne({ roles : user.roles, 'default' : '1'  }).exec(function(err, defaultMenu) {              
            return done(null, user, {
              message: 'Logged In Successfully',
              redirect : '/'+ defaultMenu.route
            });
          });
        });
    });
  }
));