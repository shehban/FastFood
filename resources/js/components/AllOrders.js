import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { get } from 'http';
import './styles.css';
import {HashRouter as Router, Link, Route} from 'react-router-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './MapContainer';


export default class AllOrders extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            address: [],
            id: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.edit = this.edit.bind(this);
    }

    edit() {
        axios.get('http://127.0.0.1:8080/api/order/' + this.state.id + '/edit').then(response => {
            console.log(response.data)
        }).catch(errors => {
            console.log(errors);
        })
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

    timediff(e) {
        if (e < 15) {
            return(
                <p className="text-success ordered">Ordered: {e} minutes ago</p>
            )
        }
        else if(e < 30) {
            return(
                <p className="text-warning ordered">Ordered: {e} minutes ago</p>
            )
        }
        else{
            return(
                <p className="text-danger ordered">Ordered: {e} minutes ago</p>
            )
        }
    }
    
    handleClick(e) {
        e.preventDefault();
        this.setState({
            id: e.target.value
        }, () => {
            this.edit()
        })
        location.reload()
    }

    async componentDidMount() {
        let response = await axios.get('/order/location');
        let data = await response.data;
        await this.setState({
                     orders: data
                });
              await this.setState({
                     address: this.state.orders.map(location => location.address.replace(/ /g, '+'))
                    })
        // await axios.get('/order/location').then(response => {
        //     this.setState({
        //         orders: response.data
        //     });
        //     this.setState({
        //         address: this.state.orders.map(location => location.address.replace(/ /g, '+'))
        //     })
        // }).catch(errors => {
        //     console.log(errors);
        // })
    }
    render() {  
        return (
            <div className="container">
            <div style={{width: "100%"}}>
               <MapContainer initialCenter={{lat: 43.3826,lng:-80.2958}}></MapContainer></div>  
            <div className="row justify-content-center">
               {this.state.orders.map(product => <li key={product.id} 
               className="text-center col-md-5 product justify-content-center">
                Address: <a href={"https://www.google.com/maps/dir/?api=1&destination=" + product.address.replace(/ /g, '+')} target="_blank">{product.address}</a><br />
                 Phone Number: <a href= {"tel:" + product.phone}>{product.phone}</a><br />Name: {product.customer_name}<br></br>
                 {this.timediff(product.time_diff)}<br></br>
                 <button type="button" value={product.id} onClick={this.handleClick} className="btn btn-success">Set As Delivered</button>
               </li>
               )}
               
               </div>      
            </div>
        );
    }
}