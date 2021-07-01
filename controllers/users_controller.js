const User = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('profile', {
        title: 'users profile'
    });
};
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Sign Up'
    });
};
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: 'Sign In'
    });
};
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding the user'); return;}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating the user while signing up'); return;}
                
                return res.redirect('/users/sign-in');
            })
        }
    })
}
module.exports.createSession = function(req, res){
    return res.redirect('/')
}