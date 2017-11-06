import React, { Component } from "react";
import { Button, Form, Input, DatePicker, Upload, Message } from 'element-react';
import { User, ImageUploadUrl } from "../helpers/Fetcher";

class Signup extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            form: {}
        };
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
        console.log("New user...");
        User.signup(this.state.form)
            .then(result => result.json())
            .then(json => { 
                this.props.onDone(json.result);
                Message.success("New user registered!");
            })
            .catch(err => Message.error("Cannot register user."));
    }

    render()
    {
        return <div className="app" style={{ padding: 16, overflowY: "auto" }}>
            <div>
                <h1 style={{textAlign:"center"}}>Me da presente</h1>
                <h3 style={{textAlign:"center"}}>Signup</h3>
            </div>
            <Form>
                <Form.Item label="Name">
                    <Input name="name" onChange={this.onChange.bind(this, "name")} />
                </Form.Item>

                <Form.Item label="Email">
                    <Input type="email" name="email" onChange={this.onChange.bind(this, "email")} />
                </Form.Item>

                <Form.Item label="Birthday">
                    <DatePicker name="birthday" onChange={this.onChange.bind(this, "birthday")} />
                </Form.Item>

                <Form.Item label="Username">
                    <Input name="username" onChange={this.onChange.bind(this, "username")} />
                </Form.Item>

                <Form.Item label="Password">
                    <Input type="password" name="password" onChange={this.onChange.bind(this, "password")} />
                </Form.Item>

                <Form.Item label="Profile picture">
                    <Upload 
                        listType="text"   
                        action={ImageUploadUrl} 
                        fileList={this.state.form.fileList}
                        className="avatar-uploader"
                        multiple={false}
                        tip={<div className="el-upload__tip">jpg/png files with a size less than 500kb</div>}
                        onChange={this.onChange.bind(this, "picture")}
                    >
                        <Button size="small" type="primary">Upload a picture</Button>
                    </Upload>
                </Form.Item>

                <Button>Cancelar</Button>
                <Button type="primary" onClick={this.onSubmit.bind(this)}>Sign Up</Button>
            </Form>
        </div>;
    }
}

export default Signup;