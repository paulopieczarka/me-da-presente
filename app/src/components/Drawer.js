import React, { Component } from "react";
import { Menu } from 'element-react';
import { Link } from 'react-router-dom';
import "../styles/Drawer.css";

const MenuItems = 
[
    { 
        name: "Menu",
        links: [
            { key: 0, icon: "account_circle", path: "/profile", title: "Profile" },
            { key: 1, icon: "settings", path: "/settings", title: "Settings" },
            { key: 2, icon: "exit_to_app", path: "/logout", title: "Log out" }
        ]
    },
    { 
        name: "Administrator",
        links: [
            { key: 3, icon: "add_circle", path: "/products/add", title: "New Product" },
            { key: 4, icon: "list", path: "/products", title: "Products" },
            { key: 5, icon: "data_usage", path: "/analytics", title: "Analytics" }
        ]
    }
];

class Drawer extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            isOpen: this.props.open
        }
    }

    onSelect() {
        this.props.close();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isOpen: nextProps.open });
    }

    render()
    {
        return <div className={`drawer${this.state.isOpen?" open":""}`}>
            <div className="drawer-content">
                <div className="user-drawer">
                    <button className="md-icon" onClick={this.props.close}>arrow_back</button>
                </div>
                <Menu mode="vertical" className="el-menu-vertical-demo" style={{borderRadius:0}} onSelect={this.onSelect.bind(this)}>
                    
                {MenuItems.map(group => <Menu.ItemGroup key={group.name} title={group.name}>
                    {group.links.map(link => <Link key={link.key} to={link.path}>
                        <Menu.Item index={`${link.key}`}><i className="material-icons">{link.icon}</i>{link.title}</Menu.Item>
                    </Link>)}
                </Menu.ItemGroup>)}

                </Menu>
            </div>
        </div>;
    }
}

export default Drawer;