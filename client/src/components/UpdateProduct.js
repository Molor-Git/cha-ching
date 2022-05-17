import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate, useParams, Link} from "react-router-dom";
import "../css/UpdateProduct.css"

const UpdateProduct = () => {
    const {id} = useParams();
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [updatedPrice, setUpdatedPrice] = useState("");
    const [authError, setAuthError] = useState("");
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`, 
            {withCredentials: true}
        )
            .then(res => {
                console.log(res.data)
                setUpdatedTitle(res.data.product.title);
                setUpdatedDescription(res.data.product.description);
                setUpdatedPrice(res.data.product.price);
            })
            .catch(err => {
                console.log(`Something went wrong: ${err}`)
            })
    }, [])
    const updateProduct = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/products/${id}`, {
            title: updatedTitle,
            description: updatedDescription,
            price: updatedPrice
        })
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => {
                console.log(`Something went wrong: ${err}`);
                if (err.response.status === 401) {
                    setAuthError("You must be logged in to update!");
                } else {
                    setErrors(err.response.data.errors)
                }
                });
    };
    return (
        <form onSubmit={updateProduct}>
            <div className="main bg-secondary">
            <h1>Cha-Ching 🤑</h1>
                <h3 className="text-info">Update Product Information</h3>
                <p>
                    <label htmlFor="title" className="text-light">Title: </label>
                    <input 
                        id="title" 
                        type="text"
                        name="title"
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                        value={updatedTitle} 
                    />
                </p>
                {authError && <h4 style={{ color: "yellow"}}>{authError}</h4> }
                {errors.title && <p style={{ color: "yellow"}}>{errors.title.message}</p> }
                <div>
                    <p>
                        <label htmlFor="description" className="Desc text-light">Description: </label>
                    <textarea
                        id="description"
                        type="text" 
                        name="description"
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        value={updatedDescription}
                        cols="30"
                        rows="10"
                        />
                    </p>
                </div>
                {errors.description && <p style={{ color: "yellow"}}>{errors.description.message}</p> }
                <p>
                    <label htmlFor="price" className="text-light">Price $</label>
                    <input 
                        id="price" 
                        type="number"
                        name="price"
                        onChange={(e) => setUpdatedPrice(e.target.value)}
                        value={updatedPrice}
                    />
                </p>
                {errors.price && <p style={{ color: "yellow"}}>{errors.price.message}</p> }
                <div className="buttons">
                    <button type="Submit" className="btn btn-success">Submit</button>
                    <button className='btn btn-primary' >
                        <Link to={"/"} className="text-light">
                            Return
                        </Link>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default UpdateProduct;