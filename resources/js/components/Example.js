import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Header from "./header";
import Footer from "./footer";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Product from './Product';
import Home from './Home';
import Login from './Login';
import ProductListing from './ProductListing';

export default class Example extends Component {
    render() {
        return (
            <div className="container">
                {/* <Router>
                    <div className="navbar justify-content-center">
                        <Link to="/">Home</Link>
                        <Link to="/products">Products</Link>
                        <Link to="/login">Login</Link>
                        </div>
                        <div className="back">
                        <Route path="/" exact component={Home}></Route>
                        <Route path="/products" exact component={Product}></Route>
                        <Route path="/product/:id" exact render={props => <ProductListing{...props} /> } ></Route>
                        </div>
                </Router> */}
            </div>
        );
    }
    }
// if (document.getElementById('body')) {
//     ReactDOM.render(<Example/>, document.getElementById('body'));
// }
// if (document.getElementById('header')) {
//     ReactDOM.render(<Header/>, document.getElementById('header'));
// }
// // if (document.getElementById('navigation')) {
// //     ReactDOM.render(<Nav/>, document.getElementById('navigation'));
// // }
// if (document.getElementById('footer')) {
//     ReactDOM.render(<Footer/>, document.getElementById('footer'));
// }