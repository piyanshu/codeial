const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){
        // finding the user and establish identity 
        User.findOne({email: email}, function(err, user){
            if(err){console.log('error in finding the user'); return};
            
            if(!user || user.password != password){
                console.log('Invalid username/password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));
// serialise a user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    return done(null, user.id);
})
// deserialise the user from the key in cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding the user'); 
            return done(err);
        }
        return done(null, user);
    })
})