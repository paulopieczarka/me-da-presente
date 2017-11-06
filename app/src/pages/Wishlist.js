import React, { Component } from "react";
import { Wishlist as WishlistModel } from "../helpers/Fetcher";
import { Link } from 'react-router-dom';

import "../styles/Wishlist.css";

class Wishlist extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            wishlists: null
        };
    }

    componentWillMount()
    {
        if(this.state.wishlists === null) 
        {
            this.setState({ wishlists: [] });
            this.props.user.wishlists.forEach(wl => {
                WishlistModel.get(wl)
                    .then(result => result.json())
                    .then(json => {
                        let { wishlists } = this.state;
                        wishlists.push(json.result);
                        this.setState({ wishlists: wishlists });
                    })
                    .catch(err => console.log(err));
            });
            // 
        }
    }

    render()
    {
        return <div className="page wishlist">
            { !this.state.wishlists && <pre>Loading..</pre> }
            { this.state.wishlists && this.state.wishlists.map(wl => ListView(wl) ) }
        </div>;
    }
}

const ListView = props => {
    return <Link key={props._id} to={`/list/${props._id}`}><div className="list" style={{ borderColor: props.color }}>
        <span className="wl-name">{props.name} ({props.products.length})</span>
        <span className="wl-desc">{props.description}</span>
    </div></Link>;
};

export default Wishlist;