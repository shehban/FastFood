import React from 'react';
import './styles.css';

export default class Footer extends React.Component {
  render() {
    return (
    <div className="container footer text-center">
    <div className="col-md-12">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      &copy; Fast Food. Inc.<br></br>
      <a href="https://www.facebook.com/shehbanhp" className="fa fa-facebook fa-2x" target="_blank"></a>
      <a href="https://www.instagram.com/shehban21/?hl=en" className="fa fa-instagram fa-2x"></a>
      <a href="https://www.twitter.com/shehbanhp" className="fa fa-twitter fa-2x"></a>
      <a href="tel:+12265072105" className="fa fa-phone fa-2x"></a>
      <a href="mailto:shehbanhp@gmail.com" className="fa fa-envelope fa-2x"></a>
      </div>
    </div>
    );
        }
      }