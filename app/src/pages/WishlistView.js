import React, { Component } from "react";
import { Message } from 'element-react';
import {Image, Wishlist } from "../helpers/Fetcher";

class WishlistView extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            data: null
        };
    }

    componentWillMount()
    {
        if(this.state.data === null) {
            this.fetchWishlist(this.props.listId);
        }
    }

    fetchWishlist(listId) 
    {
        Wishlist.get(listId, { all: true })
            .then(result => result.json())
            .then(json => this.setState({ data: json.result }))
            .catch(err => Message.error("Cannot load withlist data."));
    }

    render()
    {
        if(!this.state.data)
        {
            return <div className="page">
                { !this.state.data && <pre>Loading..</pre> }
            </div>;
        }

        let { data } = this.state;

        return <div className="page">
            <h2 style={{color:data.color}}>{data.name}</h2>
            <p>{data.description}</p>
            <p className="list-info">
                <span><i className="material-icons">remove_red_eye</i> {data.views}</span>
                <span><i className="material-icons">dns</i> {data.products.length}</span>
                <span><i className="material-icons">person_outline</i> {this.props.user.name}</span>
            </p>

            <br/><h4>Wishes for...</h4>
            <ul className="wishlist-products">
                {data.products.map(({love, price, product}) => <li key={product._id} className="product-item">
                    <Image uid={product.picture} alt={product.description} style={{borderColor:data.color}} />
                    <div className="item-desc">
                        <div>
                            <span>{product.name}</span>
                            <span>{WishAmount(love)}</span>
                        </div>
                        <span className="product-price">R$ {price}</span>
                    </div>
                </li>)}
            </ul>
        </div>;
    }
}

const WishAmount = amount => {
    const name = ['I wish', 'I want', 'I need', 'I neeeed', 'I LOVE IT'];
    return name[amount-1];
};

export default WishlistView;