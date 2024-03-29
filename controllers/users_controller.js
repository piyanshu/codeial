const User = require('../models/user');
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'users profile',
            profile_user: user
        });
    })
};
module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }
    else{
        return res.status(401).send('Unauthorised');
    }
}
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
        req.flash('error', 'Password does not match!');
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            req.flash('error', err);
            return res.redirect('back');
        }

        if(!user){
            User.create(req.body, function(err, user){
                
                if(err){
                    req.flash('error', err);
                    return res.redirect('back');
                }
                req.flash('success', 'Successfully created user!');
                return res.redirect('/users/sign-in');
            })
        }
        else
        {
            req.flash('error', 'User already exist!');
            return res.redirect('back');
        }
    })
}
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully')
    return res.redirect('/')
};
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}