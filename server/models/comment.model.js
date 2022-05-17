const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, "text is required for comment"]
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);