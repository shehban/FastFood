import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { get } from 'http';
import './styles.css';
import {HashRouter as Router, Link, Route} from 'react-router-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './MapContainer';

export default class MyOrders extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            address: [],
            id: ''
        }
        this.handleClick = this.handleClick.bind(this);
    }

    //     geocode(){
    // // geocode(place) {
    //     // axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    //         axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDP4achB68q7QrNnCK4EJMTQtB59zW_WQM')
    //         .then(function(response){
    //         console.log(response);
    //     }).catch(function(error){
    //         console.log(error);
    //     })
    // }

    // this.setState({
    //     someState: obj
    // }, () => {
    //     this.afterSetStateFinished();
    // });

    
    handleClick(e) {
        e.preventDefault();
        this.setState({
            id: e.target.value
        }, () => {
            this.edit()
        })
        location.reload()
    }

    renderthis(e) {
        if(e == 1) {
           return (
               <p>Delivery Status: Delivered</p>
           )
        }
        else {
            return(
                <p>Delivery Status: Processing</p>
            )
        }
    }

    componentWillMount() {
        axios.get('/order/myorders').then(response => {
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
               {this.state.orders.map(product => <li key={product.id} 
               className="text-center col-md-5 product justify-content-center">
               Order Number: {product.id}<br></br>
                Address: <a href={"https://www.google.com/maps/dir/?api=1&destination=" + product.address.replace(/ /g, '+')} target="_blank">{product.address}</a><br />
                 Phone Number: <a href= {"tel:" + product.phone}>{product.phone}</a><br />Name: {product.customer_name}<br></br>
                {this.renderthis(product.delivered)}
               </li>
               )}
               
               </div>      
            </div>
        );
    }
}