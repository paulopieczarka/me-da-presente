import React, { Component } from "react";
import { Form, Input, Button, Select, Message } from 'element-react';

import { Category, Product } from "../helpers/Fetcher";

class ProductsEdit extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            categories: null,
            form: { }
        };
    }

    componentWillMount()
    {
        Category.list()
            .then(result => result.json())
            .then(json => this.setState({ categories: json }))
            .catch(error => Message.error("Cannot load categories from server."));

        Product.list()
            .then(result => result.json())
            .then(json => {
                const list = json.filter(item => item._id === this.props.productId);
                let product = list[0];
                product.category = product.category._id;
                delete product.__v;
                this.setState({ form: product })
            })
            .catch(error => Message.error("Cannot load product from server."));
    }

    onChange(name, value)
    {
        let { form } = this.state;

        if(name === "picture")
            form[name] = value.response._id
        else 
            form[name] = value;
        
        this.setState({ form: form });
    }

    onSubmit()
    {
        Product.update(this.state.form)
            .then(result => Message.success("Product updated."))
            .catch(error => Message.error("Cannot update product."));
    }

    render()
    {
        return <div className="page">
            <Form labelPosition="top">
                <Form.Item label="Name">
                    <Input 
                        name="name" 
                        placeholder="Product name" 
                        onChange={this.onChange.bind(this, "name")} 
                        value={this.state.form.name}
                    />
                </Form.Item>

                <Form.Item label="Description">
                    <Input 
                        type="textarea" 
                        name="description" 
                        placeholder="Product description" 
                        onChange={this.onChange.bind(this, "description")} 
                        value={this.state.form.description}
                    />
                </Form.Item>

                <Form.Item label={`Category (${this.state.form.category})`}>
                    <Select 
                        name="category" 
                        placeholder="Select" 
                        onChange={this.onChange.bind(this, "category")}
                        disabled={this.state.categories===null}
                        noDataText="Any categories."
                        value={this.state.form.category}
                    >
                        {this.state.categories && this.state.categories.map( c => 
                            <Select.Option key={c._id} label={c.name} value={c._id} /> 
                        )}
                    </Select>
                </Form.Item>

                <Button type="success" size="large" icon="check" style={{width:"100%"}} onClick={this.onSubmit.bind(this)}>Update product</Button>
            </Form>

            <pre>{JSON.stringify(this.state.form, null, 2)}</pre>
        </div>;
    }
}

export default ProductsEdit;