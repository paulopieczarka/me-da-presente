import React, { Component } from "react";
import { Table, Button, Loading, Message } from 'element-react';
import { Product } from "../helpers/Fetcher";

class AdminProducts extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            columns: [
                { label: "Product", prop: "name" },
                { 
                    label: "Edit", 
                    width: 140,
                    render: (row, column, index) => {
                        return <Button.Group>
                            <Button icon="delete" type="danger" onClick={this.deleteProduct.bind(this, index)} />
                            <Button icon="edit" type="primary" onClick={this.editProduct.bind(this, index)} />
                        </Button.Group>;
                    }
                }
            ],
            data: []
        };
    }

    componentDidMount()
    {
        Product.list()
            .then(response => response.json())
            .then(result => this.setState({data: result}))
            .catch(error => console.log(error));
    }

    deleteProduct(index)
    {
        let { data } = this.state;
        const uid = data[index]._id;
        data.splice(index, 1);
        console.log("Deleting...", uid);

        Product.remove(uid)
            .then(result => result.json())
            .then(json => {
                Message.success(json.result);
                this.setState({ data: [...data] });
            })
            .catch(err => Message.error("Cannot delete product."));
    }

    editProduct(index)
    {
        let { data } = this.state;
        const uid = data[index]._id;
        window.location.pathname = "/products/edit/"+uid;
    }

    render()
    {
        return <div className="page">
            <h3>All products</h3>
            <p>Showing {this.state.data.length} products.</p>
            <br />

            <Loading text="Loading..." loading={this.state.data.length===0}>
                <Table
                    columns={this.state.columns}
                    data={this.state.data}
                    emptyText="Any product."
                    border={true}
                />
            </Loading>
        </div>;
    }
}

export default AdminProducts;