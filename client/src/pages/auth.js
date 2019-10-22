import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from  '../context/auth-context';

class AuthPage extends Component {

  static contextType = AuthContext;

  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginAlert: ''
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      "email": this.state.email,
      "password": this.state.password
    };

    fetch('/users/login', {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(user)
    })
      .then((res) => {
        if(res.status !== 200 && res.status !== 201) {
          this.setState({loginAlert: 'Email or password wrong. Please try again.'});
          throw new Error('Unable to login!');
        }
        return res.json();
      })
      .then(resData => {
        if(resData.token) {
          this.context.login(
            resData.token,
            resData.user._id
          );
        };
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="container" id="container-padding">
      <img src="login.svg" alt="log-in" className="login-img" />
      <h2 className="text-center my-5">Log In</h2>
      <p className="text-center" id="register-link">Need a countryLookup account?<NavLink to="/register" id="account-link">Create an account</NavLink></p>
        <div className="form-content">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" onChange={this.handleEmailChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" onChange={this.handlePasswordChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="loginAlert">
              {this.state.loginAlert}
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary form-control" id="bigger-button">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AuthPage;

