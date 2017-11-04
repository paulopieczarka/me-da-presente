import React, { Component } from "react";
import { Button, Form, Input, Message } from 'element-react';
import Signup from "./Signup";
import { User } from "../helpers/Fetcher";
import Cookies from "js-cookie";

class Welcome extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            signUp: false,
            form: {
                username: ""
            }
        };
    }

    onChange(name, value)
    {
        let { form } = this.state;
        form[name] = value;

        this.setState({ form: form });
    }

    onSubmit() {
        User.signin(this.state.form)
            .then(result => result.json())
            .then(json => {
                if(json.status === "error") {
                    Message.warning(json.result);
                    return;
                }

                const user = json.result;
                Message.success(`Welcome, ${user.username}.`);
                Cookies.set("mdpresente-oauth", user);
                this.props.onSignin(user);
            })
            .catch(err => Message.error("Cannot signin!"));
    }

    openSignup() {
        this.setState({ signUp: true });
    }

    onSignup(username) {
        this.setState({ signUp: false, form: { username: username } });
    }

    render()
    {
        if(this.state.signUp) {
            return <Signup onDone={this.onSignup.bind(this)} />;
        }

        return <div className="app" style={{ padding: 16, justifyContent:"space-between" }}>
            <h1 style={{textAlign:"center"}}>Me da presente</h1>
            <Form>
                <Form.Item label="Username">
                    <Input name="username" value={this.state.form.username} onChange={this.onChange.bind(this, "username")} />
                </Form.Item>

                <Form.Item label="Password">
                    <Input type="password" name="password" onChange={this.onChange.bind(this, "password")} />
                </Form.Item>

                <Button type="primary" style={{width:"100%"}} onClick={this.onSubmit.bind(this)}>Sign In</Button>

                <pre>{JSON.stringify(this.state.form, null, 2)}</pre>
            </Form>
            <br/>
            <Button type="success" size="large" style={{width:"100%"}} onClick={this.openSignup.bind(this)}>Sign Up</Button>
        </div>;
    }
}

export default Welcome;