const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
        }
    })
};
module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(err){console.log('Error in finding the comment');return;}
        if(comment.user == req.user.id){
            comment.remove();
            return res.redirect('back');
        }
        return res.redirect('back');
    })
};