<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LocationController extends Controller
{
    function index(Request $request) {
        $address1 = $request->get('Address');
        $address = '1600+Amphitheatre+Parkway,+Mountain+View,+CA';  
        $location = file_get_contents("https://maps.googleapis.com/maps/api/geocode/json?address=$address&key=AIzaSyDP4achB68q7QrNnCK4EJMTQtB59zW_WQM");
        $locationdetails = json_decode($location,1);
        return $locationdetails;
    }
}
