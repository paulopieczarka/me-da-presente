import React, { Component } from "react";
import { Message, Dialog, Button } from 'element-react';
import {Image, User, Wishlist } from "../helpers/Fetcher";

class WishlistView extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            dialogVisible: false,
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
            .then(json => { this.setState({ data: json.result }); console.log(json.result) })
            .catch(err => Message.error("Cannot load withlist data."));
    }

    onDelete(product) {
        this.setState({ dialogVisible: product });
    }

    onDeleteConfirm()
    {
        console.log(this.state.dialogVisible._id, this.props.user._id);
        User.removeFromWishlist(this.state.dialogVisible._id, this.props.user._id)
            .then(result => result.json())
            .then(json => {
                let { data } = this.state;
                
                let index = -1;
                data.products.forEach((p, i) => {
                    if(p._id === this.state.dialogVisible._id) {
                        index = i;
                    }
                });

                data.splice(index, 1);

                Message.success("Product removed from list.");
            })
            .catch(err => Message.error("Cannot load withlist data."));

        this.setState({ dialogVisible: false });
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

             <Dialog
                title="Remove"
                size="large"
                visible={ this.state.dialogVisible }
                onCancel={ () => this.setState({ dialogVisible: false }) }
                lockScroll={ false }
            >
                <Dialog.Body>
                <span>This is a message</span>
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                <Button onClick={ () => this.setState({ dialogVisible: false }) }>Cancel</Button>
                <Button type="primary" onClick={this.onDeleteConfirm.bind(this)}>Confirm</Button>
                </Dialog.Footer>
            </Dialog>

            <br/><h4>Wishes for...</h4>
            <ul className="wishlist-products">
                {data.products.map(({love, price, product}) => 
                <li key={product._id} className="product-item" onClick={this.onDelete.bind(this, product)}>
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