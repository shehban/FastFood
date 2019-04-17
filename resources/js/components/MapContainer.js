import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { get } from 'http';
import './styles.css';
import {HashRouter as Router, Link, Route} from 'react-router-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
const style = {
    width: "1000px",
    height: "500px",
}

export class MapContainer extends Component {
    constructor() {
        super();
        this.state= {
            latlng: []
        }
    }

    async componentWillMount() {
        axios.get('/order/location').then(response => {
            this.setState({
                latlng: response.data
            });
        }).catch(errors => {
            console.log(errors);
        })
    }

    markerimage(e) {
      if (e < 15) {
        return(
          "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        )
      }
      else if(e < 30) {
        return(
          "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
        )
      }
      else{
        return(
          "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        )
      }
    }

    onMarkerClick(Marker) {
    var url = "https://www.google.com/maps/dir/?api=1&destination=" + Marker.name.replace(/ /g, '+')
      window.open(url,'_blank')
      }

  render() {
    var image = {
      url: 'https://i.imgur.com/BzYSp0q.png',
      size: new google.maps.Size(100,100),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0,100)
    }
    var object = this.state.latlng
    var locations = Object.values(object)
    return (
        <div id="map">
      <Map google={this.props.google} zoom={11} style={style} initialCenter={{lat: 43.3904,lng:-80.4093}}>
      {locations.map(order => <Marker key={order.id} position={{lat:order.latitude, lng: order.longitude}} name={order.address} title={"Customer Name: " + order.customer_name + "\nAddress: " 
      + order.address + "\nPhone Number: " + order.phone} onClick={this.onMarkerClick} icon={this.markerimage(order.time_diff)}></Marker>
      
               )}
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} title={'Home'}
                icon = {image}
                />
    <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
            
            </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyDP4achB68q7QrNnCK4EJMTQtB59zW_WQM")
})(MapContainer)