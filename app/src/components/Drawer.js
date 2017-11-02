import React, { Component } from "react";
import { Menu } from 'element-react';
import "../styles/Drawer.css";

class Drawer extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            isOpen: this.props.open
        }
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
                <Menu mode="vertical" defaultActive="1" className="el-menu-vertical-demo" style={{borderRadius:0}}>
                    <Menu.ItemGroup title="Menu">
                        <Menu.Item index="1"><i className="material-icons">account_circle</i>Profile</Menu.Item>
                        <Menu.Item index="2"><i className="material-icons">settings</i>Settings</Menu.Item>
                        <Menu.Item index="3"><i className="material-icons">exit_to_app</i>Logout</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title="Administrator">
                        <Menu.Item index="4"><i className="material-icons">add_circle</i>New Product</Menu.Item>
                        <Menu.Item index="5"><i className="material-icons">list</i>Products</Menu.Item>
                        <Menu.Item index="6"><i className="material-icons">data_usage</i>Analytics</Menu.Item>
                    </Menu.ItemGroup>
                </Menu>
            </div>
        </div>;
    }
}

export default Drawer;