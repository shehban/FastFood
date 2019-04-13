import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { get } from 'http';
import './styles.css';
import {HashRouter as Router, Link, Route} from 'react-router-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './MapContainer';
// import MapContainer from './MapContainer';

export default class AllOrders extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            address: []
        }
    }

    geocode(place) {
        axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
            params:{
                address:place,
                key:'AIzaSyDP4achB68q7QrNnCK4EJMTQtB59zW_WQM'
            }
        }).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        })
    }


    componentWillMount() {
        axios.get('/api/order').then(response => {
            this.setState({
                orders: response.data
            });
            this.setState({
                address: this.state.orders.map(location => location.address.replace(/ /g, '+'))
            })
        }).catch(errors => {
            console.log(errors);
        })
    }
    render() {
        return (
            <div className="container">
            <div className="row justify-content-center">
               {this.state.orders.map(product => <li key={product.phone} 
               className="text-center col-md-5 product justify-content-center">
               Address: <a href={"https://www.google.com/maps/dir/?api=1&destination=" + product.address.replace(/ /g, '+')} target="_blank">{product.address}</a><br />
                 Phone Number: <a href= {"tel:" + product.phone}>{product.phone}</a><br />Name: {product.name}<br></br>Order Item: {product.productname}<br></br>
                 Quantity: {product.quantity}{this.geocode(product.address)}
               </li>
               )}
               </div>        
               {/* <MapContainer></MapContainer> */}
            </div>
        );
    }
}