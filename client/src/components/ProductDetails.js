import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import "../css/ProductDetail.css"
const ProductDetail = (props) => {

    const [product, setProduct] = useState({});
    const {id} = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                console.log(res.data);
                setProduct(res.data.product);
            })
            .catch(err => {
                console.log(`Something went wrong: ${err}`)
            })
    }, []);
    return (
        <div className="container bg-secondary text-white">
            <h1>Cha-Ching! 🤑</h1>
            <h4><span className="text-info">Title:</span> {product.title}</h4>
            <h4><span className="text-info">Description:</span> {product.description}</h4>
            <h4><span className="text-info">Price:</span> {`$${product.price}`}</h4>
            <button className='btn btn-primary' >
                <Link to={"/"} className="text-light">
                    Main
                </Link>
            </button>
        </div>
    )
}

export default ProductDetail;