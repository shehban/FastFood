import React from 'react';
import './styles.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:''
    }
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login() {
    console.log("hello");
  }

  onChange(e) {
    this.setState({[e.target.name]: [e.target.value]});
    console.log(this.state);
  }
  render() {
    return (
    <div className="row">
        <div className="col-md-12">
        <h1>Login</h1></div>
        <div className="row col-md-12">
        <h5 className="col-md-4">Username: </h5><input className="col-md-4" type="text" name="username" id="username" onChange={this.onChange} />
        <div className="col-md-4"></div>
        </div>
        <div className="row col-md-12">
        <h5 className="col-md-4">Password: </h5><input className="col-md-4" type="text" name="password" id="password" onChange={this.onChange} />
        <div className="col-md-4"></div>
        </div>
        <div className="row col-md-12">
        <div className="col-md-6"></div>
        <div className="col-md-6">
        <input type="submit" value="Login" className="button" onClick={this.login} />
        </div>
        </div>
        </div>
    );
        }
      }