import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { get } from 'http';
import './styles.css';
import {HashRouter as Router, Link, Route} from 'react-router-dom';

export default class Thanks extends Component {
    constructor() {
        super();
        this.state = {
            highestorder: ''
        }
    }
    componentWillMount() {
        axios.get('/order/highestorder').then(response => {
            this.setState({
                highestorder: response.data
            });
        }).catch(errors => {
            console.log(errors);
        })
    }
    render() {
        return (
            <div className="container">
            <div className="row justify-content-center">
               <h1 className="text-info">Thank You for Your Order. Your Order Number is: {this.state.highestorder}</h1>
               </div>
            </div>
        );
    }
}