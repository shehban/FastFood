import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { get } from 'http';
import './styles.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cartp: []
        }
    }

    componentWillMount() {
        axios.get('http://127.0.0.1:8080/cart').then(response => {
            this.setState({
                cartp: response.data
            });
        }).catch(errors => {
            console.log(errors);
        })
    }

    empty(e) {
        // e.preventDefault();
        axios.get('http://127.0.0.1:8080/clear').then(res=>{
            console.log(res.data);
        });
    }

    render() {
        var object = this.state.cartp;
        var justTheProducts = Object.values(object);
        var subtotal, total = 0;
            return (
                <div className="container justify-content-center">
               <div className="row">
               {justTheProducts.map(product => <li className="text-center col-md-5 product justify-content-center"><img className="img-fluid" src={product.image}></img> {product.name}<br />  ${product.price}<br />Quantity: {product.quantity}<br></br>Subtotal: ${subtotal = product.price * product.quantity}
               <p className="total">{(total = total + subtotal).toFixed(2)}</p>
               </li>
               )}
               <h2 className="col-sm-12 text-center">Total: ${total.toFixed(2)}</h2>
               <h3 className="col-sm-12 text-center">Approximate delivery time: ~45mins</h3>
               </div>
               {/* <Link to={"/order/" + order.id}> */}
               <button className="btn btn-success">Place My Order</button><br></br>
               <button className="btn btn-success" onClick={this.empty}>Empty Cart</button>
               {/* </Link> */}
                </div>
            );   
    }
}