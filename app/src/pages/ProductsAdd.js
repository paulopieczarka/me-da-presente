import React, { Component } from "react";
import { Form, Input, Upload, Button, Select, Message } from 'element-react';

import { Category, Product } from "../helpers/Fetcher";

class ProductsAdd extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            categories: null,
            form: {}
        };
    }

    componentWillMount()
    {
        Category.list()
            .then(result => result.json())
            .then(json => this.setState({ categories: json }))
            .catch(error => Message.error("Cannot load categories from server."));
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
        Product.add(this.state.form)
            .then(result => Message.success("Product added."))
            .catch(error => Message.error("Cannot add product."));
    }

    render()
    {
        const fileList = [];

        return <div className="page">
            <Form labelPosition="top">
                <Form.Item label="Name">
                    <Input name="name" placeholder="Product name" onChange={this.onChange.bind(this, "name")} />
                </Form.Item>

                <Form.Item label="Description">
                    <Input type="textarea" name="description" placeholder="Product description" onChange={this.onChange.bind(this, "description")} />
                </Form.Item>

                <Form.Item label="Category">
                    <Select 
                        name="category" 
                        placeholder="Select" 
                        onChange={this.onChange.bind(this, "category")}
                        disabled={this.state.categories===null}
                        noDataText="Any categories."
                    >
                        {this.state.categories && this.state.categories.map( c => 
                            <Select.Option key={c._id} label={c.name} value={c._id} /> 
                        )}
                    </Select>
                </Form.Item>

                <Form.Item label="Picture">
                    <Upload 
                        listType="text"   
                        action="http://192.168.1.104:8000/api/uploadimg" 
                        fileList={this.state.form.fileList}
                        className="avatar-uploader"
                        multiple={false}
                        tip={<div className="el-upload__tip">jpg/png files with a size less than 500kb</div>}
                        onChange={this.onChange.bind(this, "picture")}
                    >
                        <Button size="small" type="primary">Upload a picture</Button>
                    </Upload>
                </Form.Item>

                <Button type="success" size="large" icon="check" style={{width:"100%"}} onClick={this.onSubmit.bind(this)}>Add product</Button>
            </Form>

            <pre>{JSON.stringify(this.state.form, null, 2)}</pre>
        </div>;
    }
}

export default ProductsAdd;