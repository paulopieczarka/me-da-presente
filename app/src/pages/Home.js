import React, { Component } from "react";
import { Tabs } from 'element-react';

import Products from "./Products";

class Home extends Component
{
    render()
    {
        return <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
            <Tabs.Pane label="Produtos" name="1"><Products /></Tabs.Pane>
            <Tabs.Pane label="Listas" name="2">Listas</Tabs.Pane>
            <Tabs.Pane label="Amigos" name="3">Amigos</Tabs.Pane>
        </Tabs>;
    }
}

export default Home;