import React, { useState } from "react";
import axios from "axios";

const NewPost = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [authError, setAuthError] = useState("");
    const [errors, setErrors] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { 
            title, 
            text 
        };
        axios.post("http://localhost:8000/api/post", newPost, {
            withCredentials: true,
        })
        .then((newPost) => {
            console.log(newPost);
        })
        .catch((err) => {
            console.log(err.response);
            if (err.response.status === 401) {
                setAuthError("You must be logged in to add a new post!");
            } else {
                setErrors(err.response)
            }
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <h1>Add New Post</h1>
            {authError && <h3 style={{color: "red" }}>{authError}</h3> }
            {errors && <h3 style={{color: "red" }}>{errors}</h3> }
            <div>
                Title: {""}
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
            </div>
            <div>
                Item Description: {""}
                <textarea
                    cols="30"
                    rows="10"
                    value={text} 
                    onChange={(e) => setText(e.target.value)}>
                </textarea>
            </div>
            <button type="submit">Add Item</button>
        </form>
    );
};


export default NewPost;