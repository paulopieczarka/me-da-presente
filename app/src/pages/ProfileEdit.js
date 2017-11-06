import React, { Component } from "react";
import { Button, Form, Input, DatePicker, Upload, Message } from 'element-react';
import { User, ImageUploadUrl } from "../helpers/Fetcher";
import Cookies from "js-cookie";

class ProfileEdit extends Component
{
    constructor(props)
    {
        super(props);

        let { user } = this.props;
        delete user.wishlists;
        delete user.friends;
        delete user.__v;
        delete user.signupDate;

        this.state = {
            form: {
                ...user
            }
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
        User.update(this.state.form)
            .then(result => result.json())
            .then(json => { 
                console.log(json.result);
                Cookies.set("mdpresente-oauth", json.result);
                Message.success("User updated!");
            })
            .catch(err => Message.error("Cannot update user."));
    }

    render()
    {
        return <div className="page">
            <Form>
                <Form.Item label="Name">
                    <Input name="name" onChange={this.onChange.bind(this, "name")} value={this.state.form.name} />
                </Form.Item>

                <Form.Item label="Email">
                    <Input type="email" name="email" onChange={this.onChange.bind(this, "email")} value={this.state.form.email}  />
                </Form.Item>

                <Form.Item label="Birthday">
                    <DatePicker name="birthday" onChange={this.onChange.bind(this, "birthday")} value={new Date(this.state.form.birthday)}  />
                </Form.Item>

                <Form.Item label="Username (empty to not change)">
                    <Input name="username" onChange={this.onChange.bind(this, "username")} value={this.state.form.username}  />
                </Form.Item>

                <Form.Item label="Password">
                    <Input type="password" name="password" onChange={this.onChange.bind(this, "password")} value="" />
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

                <Button type="success" onClick={this.onSubmit.bind(this)}>Save</Button>
            </Form>
        </div>;
    }
}

export default ProfileEdit;