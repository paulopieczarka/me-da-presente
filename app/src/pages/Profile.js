import React, { Component } from "react";
import { Alert, Message } from 'element-react';
import { User } from "../helpers/Fetcher";

class Profile extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            profileData: null
        };
    }

    componentWillMount()
    {
        if(this.props.params && this.props.params.username) 
        {
            User.profile(this.props.params.username)
                .then(result => result.json())
                .then(json => this.setState({ profileData: json }))
                .catch(error => Message.error("Cannot retrive profile."));
        }
        else {
            this.setState({ profileData: this.props.user });
        }
    }

    render()
    {
        return <div className="page">
            {ProfileRender(this.state.profileData)}
        </div>;
    }
}

const ProfileRender = profile => 
{
    if(!profile) {
        return <Alert 
            title="Profile not found!" 
            type="info" 
            description="Oopps!" 
            showIcon={true} 
            closable={false} 
        />;
    }

    return <pre>{ JSON.stringify(profile, null, 2) }</pre>;
};

export default Profile;