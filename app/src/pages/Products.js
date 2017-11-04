import React, { Component } from "react";
import { Loading } from 'element-react';
import { Image } from "../helpers/Fetcher";
import WishlistAdd from "./WishlistAdd";

import "../styles/Products.css";

class Products extends Component
{
    componentDidMount()
    {
        fetch(
            "http://192.168.1.106:8000/api/product/list",
            { mode: "cors" }
        )
        .then(response => response.json())
        .then(result => this.setState({products: result}))
        .catch(error => console.log(error));
    }

    render()
    {
        let { state } = this;

        return <div className="product-list">
            {state && state.products.map(p => 
                <div key={p._id} className="product">
                    <Image uid={p.picture} alt={p.name} />
                    <div className="text">
                        <span className="p-name">{p.name}</span>
                        <span className="p-desc">{p.description}</span>
                        
                    </div>
                </div>
            )}
            {!state && <Loading loading={true} text="Loading..." fullscreen={true} />}
            <WishlistAdd />
        </div>;
    }
}

export default Products;