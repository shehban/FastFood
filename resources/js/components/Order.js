import React from 'react';
import './styles.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Cart from './Cart';
import Autocomplete from 'react-google-autocomplete';
import axios from 'axios';

const style = {
    position: 'static',
    width: '500px', 
    height: '500px'
};

export default class Order extends React.Component {
    constructor() {
        super();
        this.state = {
            cartp: [],
            userid:'',
            name:'',
            Phone:'',
            Address:'',
            productid: '',
            quantity: '',
            lat: '',
            lng: ''
        }
        this.Address = this.Address.bind(this);
        this.name = this.name.bind(this);
        this.Phone = this.Phone.bind(this);
        this.geocode = this.geocode.bind(this);
    }

    Address(e,f) {
        this.setState({
            Address: e,
            userid: f
        });
    }

    name(e) {
        this.setState({
            name: e.target.value
        });
    }

    Phone(e) {
        this.setState({
            Phone: e.target.value
        });
    }

    productdetails(id,qty) {
        this.setState({
            productid: id,
            quantity: qty
        })
    }

    geocode() {
        axios.get("/api/location/" + this.state.Address.replace(/ /g, '+')).then(response => {
            this.setState({
                lat: response.data.results[0].geometry.location.lat,
                lng: response.data.results[0].geometry.location.lng
            });
            console.log(this.state)            
            }).catch(errors => {
                console.log(errors);
            console.log(response.data.results[0].geometry.location.lat); 
        })
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

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/api/order', this.state).then(response => {
            console.log(response);
        }).then(error => {
            console.log(error);
        });
    }
  
  render() {
    var object = this.state.cartp;
    var user = globalData;
    var userdetails = Object.values(user);
    var justTheProducts = Object.values(object);
    var subtotal, total = 0;
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(43.3477, -80.2032),
        new google.maps.LatLng(43.4814, -80.6149));
    return (
        <div className="container justify-content-center">
             <div className="container justify-content-center">
               <div className="row">
               {justTheProducts.map(product => <li key={product.id} className="text-center col-md-5 product justify-content-center"><img className="img-fluid" src={product.image}></img> {product.name}<br />  ${product.price}<br />Quantity: {product.quantity}<br></br>Subtotal: ${subtotal = product.price * product.quantity}
               <p className="total">{(total = total + subtotal).toFixed(2)}</p>
                </li>
               )}
               <h2 className="col-sm-12 text-center">Total: ${total.toFixed(2)}</h2>
               <h3 className="col-sm-12 text-center">Approximate delivery time: ~45mins</h3>
               </div>
               </div>
            <h1>Order Page</h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group row">
                <label className="label col-sm-2">Name: </label>
                <input type="text" name="name" className="col-sm-4" onChange={this.name} value={this.state.name}></input></div>
                <div className="form-group row">
                <label className="txt-info col-sm-2">Phone Number: </label>
                <input className="col-sm-4" type="number" name="tel" onChange={this.Phone} value={this.state.Phone}></input></div>
                <div className="form-group row">
                <p className="col-sm-2">Address: &nbsp;</p>
                <Autocomplete
    style={{width: '100%'}}
    onPlaceSelected={(place) => {
        this.Address(place.formatted_address,userdetails[0].id)
        this.productdetails((parseInt(justTheProducts.map(product => product.id))),(parseInt(justTheProducts.map(product => product.quantity))));
        this.geocode()
    }}
    types={['address']}
    componentRestrictions={{country: "ca"}}
    bounds={new google.maps.LatLngBounds(
        new google.maps.LatLng(43.3741,-80.5966),
        new google.maps.LatLng(43.5070,-80.2823)
    )}
    className="col-sm-4"
/>
</div>
                {/* <div className="form-group row">
                <label className="label col-sm-2">Address Line 1: </label>
                <input type="text" name="address1" className="form-input"></input></div>
                <div className="form-group row">
                <label className="label col-sm-2">Address Line 2: </label>
                <input type="text" name="address2" className="form-input"></input></div>
                <div className="form-group row">
                <label className="label col-sm-2">Zipcode: </label>
                <input type="text" name="zipcode" minLength='6' maxLength='6' className="form-input"></input></div> */}
                <br></br><button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
        }
      }