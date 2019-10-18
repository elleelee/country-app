import React, { Component } from 'react';
import AuthContext from  '../context/auth-context'

class AuthPage extends Component {

  static contextType = AuthContext;

  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      "email": this.state.email,
      "password": this.state.password
    }

    // console.log(user)

    fetch('/users/login', {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(user)
    })
      .then((res) => {
        if(res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        if(resData.token) {
          this.context.login(
            resData.token,
            resData.user._id
          );
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="container">
        <div className="form-content">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" onChange={this.handleEmailChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" onChange={this.handlePasswordChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AuthPage;

