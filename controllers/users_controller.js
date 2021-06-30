const User = require('../models/user');
module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('profile', {
                    title: 'user profile',
                    user: user
                })
            }else{
                return res.redirect('/users/sign-in');
            }
        })
    }else{
        return res.redirect('/users/sign-in');
    }
};
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Sign Up'
    });
};
module.exports.signIn = function(req, res){
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
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding the user while signing in'); return;}

        if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id', user._id);
            return res.redirect('/users/profile');
        }else{
            return res.redirect('back');
        }
    })
}