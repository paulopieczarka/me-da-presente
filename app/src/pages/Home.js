import React, { Component } from "react";
import { Tabs } from 'element-react';

import Products from "./Products";
import Wishlist from "./Wishlist";

class Home extends Component
{
    render()
    {
        return <Tabs activeName="1">
            <Tabs.Pane label="Produtos" name="1"><Products user={this.props.user} /></Tabs.Pane>
            <Tabs.Pane label="Listas" name="2"><Wishlist user={this.props.user} /></Tabs.Pane>
            <Tabs.Pane label="Amigos" name="3">Amigos</Tabs.Pane>
        </Tabs>;
    }
}

export default Home;