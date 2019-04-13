import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { get } from 'http';
import './styles.css';
import Cart from './Cart';

export default class ProductListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity:'',
            id:'',
            post: {}
        }
        this.quantity = this.quantity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    quantity(id, e) {
        this.setState({
            quantity: e.target.value, id:id
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('http://127.0.0.1:8080/add', {
            quantity: this.state.quantity,
            id: this.state.id
        }).then(res=>{
            console.log(res.data);
        });
    }

    componentDidMount() {
        axios.get("/api/product/" + this.props.match.params.id).then(response => {
            this.setState({post : response.data[0] });
        }).catch(errors => console.log(errors));
    }

  render() {
    return (
        <div className="text-center row">
        <form onSubmit={this.handleSubmit} method="post">
        <img className="col-md-5 product" src={"../"+this.state.post.image} alt={this.state.post.productname}></img>
        <h4 className="col-md-12">{this.state.post.productname}</h4>
        <h5 className="col-md-12">$ {this.state.post.price}</h5>
        <input type="number" onChange={(e) => {this.quantity(this.state.post.id,e)}} min="1" max="10" className="form-control quantity" placeholder="Quantity"></input>
        <br></br>
        <button className="btn btn-success" type="submit" >Add to Cart</button>
        </form>
        <Cart></Cart>
        </div>
    );
        }
      }