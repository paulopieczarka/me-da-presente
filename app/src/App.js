import React, { Component } from "react";
import { Tabs } from 'element-react';
import Products from "./pages/Products";
import Drawer from "./components/Drawer";

import 'element-theme-default';
import "./styles/CustomTheme.css";
import "./styles/App.css";

class App extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            isDrawerOpen: false
        }
    }

    toggleDrawer() {
        this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    }

    render()
    {
        return <div className="app">
            <header>
                <button className="md-icon" onClick={this.toggleDrawer.bind(this)}>menu</button>
                <div className="app-title">Me Da Presente</div>
                <button className="md-icon">shopping_cart</button>
            </header>

            <Drawer open={this.state.isDrawerOpen} close={this.toggleDrawer.bind(this)} />

            <main>
                <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
                    <Tabs.Pane label="Produtos" name="1"><Products /></Tabs.Pane>
                    <Tabs.Pane label="Listas" name="2">Listas</Tabs.Pane>
                    <Tabs.Pane label="Amigos" name="3">Amigos</Tabs.Pane>
                </Tabs>
            </main>
        </div>;
    }
}

export default App;