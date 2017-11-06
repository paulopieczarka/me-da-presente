import React, { Component } from "react";
import { Router, Route, Link } from 'react-router-dom';
import Cookies from "js-cookie";

import createBrowserHistory from 'history/createBrowserHistory';

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import ProductsAdd from "./pages/ProductsAdd";
import Drawer from "./components/Drawer";
import Profile from "./pages/Profile";
import WishlistView from "./pages/WishlistView";
import AdminProducts from "./pages/AdminProducts";
import ProductsEdit from "./pages/ProductsEdit";
import ProfileEdit from "./pages/ProfileEdit";
import { Image } from "./helpers/Fetcher";

import 'element-theme-default';
import "./styles/CustomTheme.css";
import "./styles/App.css";

const customHistory = createBrowserHistory();

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
            isDrawerOpen: false,
            user: null
        }
    }

    componentWillMount()
    {
        customHistory.listen(this.onLocationChange.bind(this));

        let user = Cookies.get("mdpresente-oauth");
        if(user) {
            this.onSignin(JSON.parse(user));
        }
    }

    componentDidMount() {
        this.onLocationChange(window.location, "INITIAL");
    }

    onLocationChange(location, action) {
        this.setState({ outsideHome: (location.pathname !== "/") });
    }

    toggleDrawer() {
        this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    }

    onSignin(user) {
        this.setState({ user: user });
    }

    render()
    {
        if(this.state.user === null) {
            return <Welcome onSignin={this.onSignin.bind(this)} />;
        }

        return <Router history={customHistory}><div className="app">
            <header>
                <MenuButton 
                    toggleDrawer={this.toggleDrawer.bind(this)} 
                    back={this.state.outsideHome} 
                />
                <div className="app-title">Me Da Presente</div>
                <Link to="/profile">
                    <Image uid={this.state.user.picture} alt="profile" className="profile-picture" />
                </Link>
            </header>

            <Drawer open={this.state.isDrawerOpen} close={this.toggleDrawer.bind(this)} />

            <main>
                <Route exact path="/" component={() => <Home user={this.state.user} />} />
                <Route exact path="/products/add" component={ProductsAdd} />
                <Route exact path="/profile/:username?" component={
                    ({match}) => <Profile user={this.state.user} params={match.params} />
                } />
                <Route exact path="/list/:id" component={
                    ({match}) => <WishlistView key="wishlist-view" user={this.state.user} listId={match.params.id} />
                } />
                <Route exact path="/products" component={AdminProducts} />
                <Route exact path="/products/edit/:id" component={
                    ({match}) => <ProductsEdit user={this.state.user} productId={match.params.id} />
                } />
                <Route exact path="/edit/profile" component={() => <ProfileEdit user={this.state.user} />} />
            </main>

            <button className={`float${this.state.outsideHome?" hide":""}`}>add</button>
        </div></Router>;
    }
}

export default App;