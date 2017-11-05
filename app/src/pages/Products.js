import React, { Component } from "react";
import { Loading } from 'element-react';
import { Image } from "../helpers/Fetcher";
import { Product } from "../helpers/Fetcher";
import WishlistAdd from "./WishlistAdd";

import "../styles/Products.css";

class Products extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            products: [],
            selectedProductId: null
        }
    }

    componentDidMount()
    {
        Product.list()
            .then(response => response.json())
            .then(result => this.setState({products: result}))
            .catch(error => console.log(error));
    }

    addProductToWishlist(id) {
        this.setState({ selectedProductId: id });
    }

    onSuccess() {
        this.clearSelected();
    }

    clearSelected() {
        this.setState({ selectedProductId: null });
    }

    render()
    {
        let { state } = this;

        return <div className="product-list">
            {state && state.products.map(p => 
                <div key={p._id} className="product" onClick={this.addProductToWishlist.bind(this, p._id)}>
                    <Image uid={p.picture} alt={p.description} />
                    <div className="text">
                        <span className="p-name">{p.name}</span>
                        <span className="p-desc">{p.description}</span>
                    </div>
                </div>
            )}
            {!state && <Loading loading={true} text="Loading..." fullscreen={true} />}
            <WishlistAdd 
                user={this.props.user} 
                product={this.state.selectedProductId} 
                onSuccess={this.onSuccess.bind(this)}
                onCancel={this.clearSelected.bind(this)}
            />
        </div>;
    }
}

export default Products;