const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req, res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        return res.redirect('back');
    }catch(err){
        console.log('ERROR', err);
        return;
    }
    
};
module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id)

        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            res.redirect('back');
        }
        else{
            res.redirect('back');
        }
    }catch(err){
        console.log('ERROR', err);
        return;
    }
};