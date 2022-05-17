const Post = require("../models/post.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const addNewPost = async (req, res) => {
    const { body } = req;
    let newPost = new Post(body);
    console.log(newPost);
    console.log("new post added id", newPost);

    try {
        newPost = await newPost.save();
        res.json(newPost);
        return;
    } catch (error) {
        console.log("error!", error);
        res.status(400).json(error);
        return;
    } 
};

module.exports = {
    addNewPost,
};
