import React, { Component } from "react";
import { Badge } from 'element-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from "./pages/Home";
import ProductsAdd from "./pages/ProductsAdd";
import Drawer from "./components/Drawer";

import 'element-theme-default';
import "./styles/CustomTheme.css";
import "./styles/App.css";

const MenuButton = (props) => <div>
    {!props.back && <button className="md-icon" onClick={props.toggleDrawer}>menu</button>}
    {props.back && <button className="md-icon" onClick={props.home}><Link to="/">arrow_back</Link></button>}
</div>;

class App extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            outsideHome: false,
            isDrawerOpen: false
        }
    }

    toggleDrawer() {
        this.goHome();
        this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    }

    goHome() 
    {
        /* TODO: Do it better. */
        setTimeout(() => {
            this.setState({ outsideHome: (window.location.pathname !== "/") });
        }, 5);
    }

    render()
    {
        return <Router><div className="app">
            <header>
                <MenuButton 
                    toggleDrawer={this.toggleDrawer.bind(this)} 
                    home={this.goHome.bind(this)} 
                    back={this.state.outsideHome} 
                />
                <div className="app-title">Me Da Presente</div>
                <Badge isDot>
                    <button className="md-icon">favorite</button>
                </Badge>
            </header>

            <Drawer open={this.state.isDrawerOpen} close={this.toggleDrawer.bind(this)} />

            <main>
                <Route exact path="/" component={Home} />
                <Route exact path="/products/add" component={ProductsAdd} />
            </main>

            <button className={`float${this.state.outsideHome?" hide":""}`}>add</button>
        </div></Router>;
    }
}

export default App;