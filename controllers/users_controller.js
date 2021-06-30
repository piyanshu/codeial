module.exports.profile = function(req, res){
    return res.render('profile', {
        title: 'users profile'
    });
};
module.exports.signUp = function(req, res){
    return res.render('sign-up', {
        title: 'Sign Up'
    });
};
module.exports.signIn = function(req, res){
    return res.render('sign-in', {
        title: 'Sign In'
    });
};