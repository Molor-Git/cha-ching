import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import io from 'socket.io-client';

const ShowProducts = (props) => {
    const {removeFromDom, products, setProducts} = props;
    const [authError, setAuthError] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [socket] = useState( () => io(":8000") );

    useEffect(() => {
        console.log("Inside of useEffect for socket");

        //We listen using the .on() function - this is for BOTH client and server
        socket.on("connect", () => {
            console.log("We're connected with the server on: " + socket.id);
        });
        // Listening for a new product added!!!
        socket.on("product_added", (data) => {
            console.log(data);
            console.log(products);

            setProducts((currentProductValue) => {
                console.log("Inside setProducts: " + currentProductValue);
                
                return [ data, ...currentProductValue ];
            });
        });

        socket.on("product_deleted", (data) => {
            setProducts((currentListOfProducts) => {
                let filteredProducts = currentListOfProducts.filter((oneProduct) => {
                    return oneProduct._id !== data;
                })
                
                return filteredProducts;
            })
        });

        // need to clean up our connection when this component is unloaded
        // return ONLY runs when this components is closed/unloaded
        return () => socket.disconnect();

    }, []);
    
    // DELETE 
    const deleteProduct = (productId) => {
        axios.delete(`http://localhost:8000/api/products/${productId}`)
            .then((res) => {
                console.log(res.data)
                removeFromDom(productId)
                // socket.emit("deleted_product", productId)
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 401) {
                    setAuthError("You must be logged in to delete a product!");
                } else {
                    setErrors(err.response.data.errors)
                }
            });
        }
    
    // GET AND DISPLAY ALL
    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
        .then((res) => {
            console.log(res.data);
            setProducts(res.data.products);
        })
        .catch((err) => {
            console.log(err);
            setErrors(err.response.data.error)
        })
    }, []);
    const handleLogout = () => {
        axios.post("http://localhost:8000/api/logout",
            {},
            {
                withCredentials: true,
            },
        )
        .then((response) => {
            console.log(response);
            navigate("/register")
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="bg-cover" style={{background: "whitesmoke"}}>
        <div className="header">
            <h1>Cha-Ching 🤑</h1>
            {/* {errors && <h3 style={{color: "red" }}>{errors}</h3> } */}
            {authError && <p style={{ color: "red"}}>{authError}</p> } 
            <button className="btn btn-success">
                <Link to={"/add-product"} 
                    className="text-light">Add Product
                </Link>
            </button>
            <button className="btn btn-primary">
                <Link to={"/register"} 
                    className="text-light" 
                    onClick={handleLogout}>Logout
                </Link>
            </button>
        </div>
            <table className="table table-striped text-start">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
            {
                products.map((product, index) => {
                    return (
                    <tbody key={product._id}>
                        <tr>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>${product.price}</td>
                            <td className="btn btn-info btn-sm text-primary">
                                <Link to={`/details/${product._id}`}>Details</Link>
                            </td>
                            <td className="btn btn-warning btn-sm text-primary">
                                <Link to={`update/${product._id}`}>Update</Link>
                            </td>
                            <td onClick={(e) => {deleteProduct(product._id)}} 
                                className="btn btn-danger btn-sm">
                                <Link to={`/`}>Delete</Link>
                            </td>
                        </tr>
                    </tbody>
                    )
                })
            }
            </table>
        </div>
    );
};

export default ShowProducts;