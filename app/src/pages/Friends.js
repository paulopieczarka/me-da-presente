import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { User } from "../helpers/Fetcher";

class Friends extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            people: []
        };
    }

    componentDidMount()
    {
        User.list()
            .then(result => result.json())
            .then(json => this.setState({ people: json.result }))
            .catch(err => console.log(err));
    }

    render()
    {
        return <div className="page">
            <h2>People</h2>
            <p>Showing 0 user form database.</p>
            <br />

            {this.state.people.map(p => 
                <div key={p._id}><Link to={`/profile/${p.username}`}>{p.name}</Link><br /></div>
            )}
        </div>;
    }
}

export default Friends;