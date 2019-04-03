import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { get } from 'http';
import './styles.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default class Product extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    }
    componentWillMount() {
        axios.get('/api/product').then(response => {
            this.setState({
                products: response.data
            });
        }).catch(errors => {
            console.log(errors);
        })
    }
    render() {
        return (
            <div className="container">
            <div className="row justify-content-center">
               {this.state.products.map(product => <li className="text-center col-md-5 product justify-content-center"><img className="img-fluid" src={product.image}></img> {product.productname}<br />  ${product.price}<br />
                <Link to={"/product/" + product.id}>
               <button className="btn-success">Buy Now</button>
               </Link>
               </li>
               )}
               </div>
            </div>
        );
    }
}