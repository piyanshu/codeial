const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done){
        // finding the user and establish identity 
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            };
            
            if(!user || user.password != password){
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));
// serialise a user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    return done(null, user.id);
});
// deserialise the user from the key in cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding the user');
            return done(err);
        }
        return done(null, user);
    });
});
passport.checkAuthentication = function(req, res, next){
// If the user is signed-in then pass on the request to the function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
};
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
/* req.user contains current signed in user from session cookie and we are just 
    sending it to the locals for the views */
        res.locals.user = req.user;
    }
    return next();
}