import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/AddProduct.css"

const AddProduct = (props) => {
    // const {products, setProducts} = props;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [authError, setAuthError] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newProduct = {
            title,
            description,
            price,
        }
        axios.post('http://localhost:8000/api/products', newProduct, {
            withCredentials: true,
        })
            .then((newProduct) => {
                console.log(newProduct);
                // setProducts([...products]); 
                navigate("/");
                
                // Tell the server that we successfully added a new product!
                // socket.emit("added_pet", res.data.createdPet)
                // Make sure you clean up after yourself - do NOT leave a socket connected!
                // socket.disconnect();
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    setAuthError("You must be logged in to add a new product!");
                } else {
                    setErrors(err.response.data.errors)
                }
            });
        };
        const handleLogout = () => {
            axios.post("http://localhost:8000/api/logout",
                {},
                {
                    withCredentials: true,
                },
            )
            .then((response) => {
                console.log(response);
                navigate("/register");
            })
            .catch((err) => {
                console.log(err);
                setErrors(errors);
            });
        };
    return (
        <form onSubmit={onSubmitHandler} className="add bg-secondary">
            <h1 className="text-info">Cha-Ching🤑</h1>
            <h3 className="text-light">Display item for sell</h3>
            {authError && <h4 style={{ color: "yellow"}}>{authError}</h4> }
            <div className="Ptag">
                <p>
                    <label className='text-light'>Title:</label>
                    <input 
                        type="text" onChange={(e) => setTitle(e.target.value)}/>
                </p>
                {errors.title && <h5 style={{ color: "yellow"}}>{errors.title.message}</h5> }
                <p>
                    <label className='text-light'>Description:</label>
                </p>
                <p>
                    <textarea 
                        onChange={(e) => setDescription(e.target.value)} 
                        name="description" 
                        cols="30" 
                        rows="10"
                        />
                </p>
                {errors.description && <h5 style={{ color: "yellow"}}>{errors.description.message}</h5> }
                <p>
                    <label className='text-light'>Price:</label>
                    <input 
                        type="number" 
                        onChange={(e) => setPrice(e.target.value)}
                        />
                </p>
            </div>
            {errors.price && <h5 style={{ color: "yellow"}}>{errors.price.message}</h5> }
            <div className="btn">
                <button type='submit' className="btn btn-success">Add Product</button>
                <button className="btn btn-primary">
                    <Link className="text-light" to={"/"}>Return</Link>
                </button>
                <button 
                    className="btn btn-danger"
                    onClick={handleLogout}>
                    <Link className="text-light" to={"/login"}>Logout</Link>
                </button>
            </div>
        </form>
    );
};

export default AddProduct;
