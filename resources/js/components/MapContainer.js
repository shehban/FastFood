import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { get } from 'http';
import './styles.css';
import {HashRouter as Router, Link, Route} from 'react-router-dom';

export default class MapContainer extends Component {

    componentDidMount() {
        this.loadMap()
    }

    loadMap() {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAB5OYmLjtD731NELMcd2JbVcI8zkFikKU&callback=initMap")
        window.initMap = this.initMap
    }

    initMap() {
        var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 43.3817, lng: -80.3039},
          zoom: 15
        });

        // var marker = new google.maps.Marker({
        //     position
        // })
      }

    render() {
        return (
            <main>
                <div id="map" className="justify-content-center"></div>
            </main>
        )
    }
}

function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script,index)
}