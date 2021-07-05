const Post = require('../models/post');
module.exports.home = function(req, res){
// Populate the user of each of post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        if(err){console.log('Error in finding posts');return;}
        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts
        });
    })
};