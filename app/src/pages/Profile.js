import React, { Component } from "react";
import { Alert, Message, Button } from 'element-react';
import { Link } from 'react-router-dom';
import { Image, User } from "../helpers/Fetcher";

import "../styles/Profile.css";

class Profile extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            profileData: null,
            canAddFriend: true
        };
    }

    componentWillMount()
    {
        if(this.props.params && this.props.params.username) 
        {
            User.profile(this.props.params.username)
                .then(result => result.json())
                .then(json => {
                    this.setState({ 
                        canAddFriend: true, 
                        profileData: json
                    })
                })
                .catch(error => Message.error("Cannot retrive profile."));
        }
        else {
            this.setState({ canAddFriend: false, profileData: this.props.user });
        }
    }

    render()
    {
        return <div className="page profile">
            {ProfileRender(this.state.profileData, !this.state.canAddFriend)}
        </div>;
    }
}

const ProfileRender = (profile, itsUser = false) => 
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

    return <div>
        <div className="p-top">
            <span><Image uid={profile.picture} /></span>
            <div>
                <span>{profile.name}</span>
                <span>@{profile.username}</span>
            </div>
            { !itsUser && <Button icon="plus" plain={true} type="info">Add</Button> }
            { itsUser && <Link to="/edit/profile">
                <Button icon="edit" plain={true} type="info">Edit</Button>
            </Link> }
        </div>

        <br/><h4>Wishlists</h4>
        <ul>
            { (typeof profile.wishlists[0] === "string") && profile.wishlists.map(wl => <li key={wl}>{wl}</li>) }
            { (typeof profile.wishlists[0] === "object") && profile.wishlists.map(wl => 
                <li key={wl.name}><Link to={`/list/${wl._id}`}>{wl.name}</Link></li>) 
            }
        </ul>
        <pre>{ JSON.stringify(profile, null, 2) }</pre>
    </div>;
};

export default Profile;