import React, { useState } from "react";
// import AddProduct from "../components/AddProduct";
import ShowProducts from "../components/ShowProducts";

const Main = () => {
    const [products, setProducts] = useState([]);
    
    const removeFromDom = productId => {
        setProducts(products.filter(product => product._id !== productId));
    }

    return (
        <div>
            {/* <AddProduct products={products} setProducts={setProducts}/> */}
            <hr />
            <ShowProducts products={products} setProducts={setProducts} 
            removeFromDom={removeFromDom}/>
        </div>
    )
}

export default Main;