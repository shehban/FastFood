import React from 'react';
import './styles.css';

export default class Home extends React.Component {
  render() {
    return (
    <div>
    
    <h2 className="text-center">Our Delivery Area</h2>
    
    <img className="img-fluid" src="./images/map-waterloo.png"></img>
    <div className="empty"></div>
    <div className="text-center">
      <h2>About Us</h2>
      <div className="row">
      <div className="col-md-4">
      <img className="img-fluid rounded-circle" src="./images/hamburger.jpg"></img></div>
      <h4 className="col-md-8">Chef On Call is a food concept for students, young professionals, and anyone who desires convenient, home-style fresh comfort food at an affordable price.<br />

We take pride in our homemade recipes and our wide range of selection. From breading our one of a kind chicken tenders by hand, to mixing our own hamburger recipe, to all of our delicious dipping sauces, we offer our love of food for the health conscious, comfort seekers, and everyone in between.<br />
</h4>
</div>
    </div>
    <div className="empty"></div>
    </div>
    );
        }
      }