const Comment = require("../models/comment.model");
const jwt = require("jsonwebtoken");
const Post = require("../models/post.model");

const addNewComment = async (req, res) => {
    const { body, params } = req;
    let newComment = new Comment(body);
    newComment.post_id = params.postId;
    console.log("comment doc after adding post id", newComment);
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
    newComment.user_id = decodedJwt.payload.id;
    console.log("after adding post and user id to comment doc", newComment);
    
    try {
        newComment = await newComment.save();
        postQuery = await Post.findByIdAndUpdate(
            {_id: params.postId},
            { $push: { comments: newComment._id } },
            { new: true, useFindAndModify: true }
        );
        res.json({ newComment, postQuery})
    } catch (error) {
        res.status(400).json(error);
    }
    // res.json({ msg: "gets here" }); // remove
};

module.exports = { addNewComment };