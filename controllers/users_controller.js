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