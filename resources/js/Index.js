import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './components/styles.css';
import Header from "./components/header";
import Footer from "./components/footer";
import {HashRouter as Router, Link, Route} from 'react-router-dom';
import Product from './components/Product';
import Example from './components/Example';
import Home from './components/Home';
import Order from './components/Order';
import Login from './components/Login';
import ProductListing from './components/ProductListing';
import Cart from './components/Cart';
import AllOrders from './components/AllOrders';

export default class Index extends Component {
    render() {
        return (
            <div className="container">

             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <Router>
                        <Link to="/">Home</Link>
                        <Link to="/products">Products</Link>
                        <Link to="/cart"><i className="fa fa-shopping-cart"></i></Link>
                        <div className="back justify-content-center">
                        <Route path="/" exact component={Home}></Route>
                        <Route path="/order" exact component={Order}></Route>
                        <Route path="/products" exact component={Product}></Route>
                        <Route path="/product/:id" exact render={props => <ProductListing{...props} /> }></Route>
                        <Route path="/cart" async exact component={Cart}></Route>
                        <Route path="/allorders" exact component={AllOrders}></Route>
                        {/* <Route path="/map" exact component={MapContainer}></Route> */}
                        </div>
                </Router>
            </div>
        );
    }
    }
if (document.getElementById('body')) {
    ReactDOM.render(<Index/>, document.getElementById('body'));
}
if (document.getElementById('header')) {
    ReactDOM.render(<Header/>, document.getElementById('header'));
}
// if (document.getElementById('navigation')) {
//     ReactDOM.render(<Nav/>, document.getElementById('navigation'));
// }
if (document.getElementById('footer')) {
    ReactDOM.render(<Footer/>, document.getElementById('footer'));
}