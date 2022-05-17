const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Please describe your product"],
        minlength: [10, "Description must be atleast 10 characters long"]
    },
    price: {
        type: Number,
        required: [true, "Price must be provided"],
        minlength: [1, "value can't be negative numbers"]
    },

    // imageUrl: {
    //     type: String,
    // },
    //this is the user that created this Product model
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {timestamps: true});

module.exports = mongoose.model("Product", ProductSchema);