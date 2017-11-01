import React, { Component } from "react";
import { Loading } from 'element-react';

class Products extends Component
{
    componentDidMount()
    {
        fetch(
            "http://localhost:8000/api/products",
            { mode: "cors" }
        )
        .then(response => response.json())
        .then(result => this.setState({products: result}))
        .catch(error => console.log(error));
    }

    render()
    {
        let { state } = this;

        return <div>
            {state && state.products.exclusives.map(p => 
                <div key={p.id}>{p.name}</div>
            )}
            {!state && <Loading loading={true} text="Loading..." fullscreen={true} />}
        </div>;
    }
}

export default Products;