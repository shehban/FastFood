import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { get } from 'http';
import Order from './Order';
import './styles.css';
import {HashRouter as Router, Link, Route} from 'react-router-dom';

export default class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cartp: [],
            total: ''
        }
        this.total = this.total.bind(this);
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

    total(e) {
        this.setState({
            total: e
        })
    }

    empty(e) {
        // e.preventDefault();
        axios.get('http://127.0.0.1:8080/clear').then(res=>{
            console.log(res.data);
        });
        location.reload()
    }



    render() {
        var object = this.state.cartp;
        var justTheProducts = Object.values(object);
        var subtotal, total = 0;
        console.log(object)
        if(object.length != 0){
            return (
                <div className="container justify-content-center">
               <div className="row">
               {justTheProducts.map(product => <li key={product.name} className="text-center col-md-5 product justify-content-center"><img className="img-fluid" src={product.image}></img> {product.name}<br />  ${product.price}<br />Quantity: {product.quantity}<br></br>Subtotal: ${subtotal = product.price * product.quantity}
               <p id="total" className="total">{(total = total + subtotal).toFixed(2)}</p>
                </li>
               )}
               <h2 className="col-sm-12 text-center">Total: ${total.toFixed(2)}</h2>
               <h3 className="col-sm-12 text-center">Approximate delivery time: ~45mins</h3>
               </div>
               {/* <Link to={"/order/" + order.id}> */}
               {justTheProducts.map(product =>
               <form className="form" method="post">
               <input type="hidden" name="productid" value={product.id}></input>
               <input type="hidden" name="productid" value={product.quantity}></input>
               </form>
               )}
               <div className="row">
               <Link to="/order" className="btn btn-success col-sm-2">Place My Order
                </Link>
                <div className="col-sm-1"></div>
               <button className="btn btn-success col-sm-2" onClick={this.empty}>Empty Cart</button>
               </div>
                </div>
            );   
        }
        else {
            return(
                <h1 className="text-center text-info">Your cart is empty</h1>
            );
        }
    }
}