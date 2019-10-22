import React, { Component } from 'react';
import AuthContext from  '../context/auth-context';

class CreateUserPage extends Component {

  static contextType = AuthContext;

  constructor (props) {
    super(props);
    this.state = {
      name:'',
      email: '',
      password: ''
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
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
      "name": this.state.name,
      "email": this.state.email,
      "password": this.state.password
    };

    fetch('/users', {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(user)
    })
      .then((res) => {
        if(res.status !== 200 && res.status !== 201) {
          throw new Error('Email has been used!');
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
      <img src="register.svg" alt="log-in" className="login-img" />
      <h2 className="text-center my-5">Create An Account</h2>
        <div className="form-content">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputName1" className="form-label">Name</label>
              <input type="text" onChange={this.handleNameChange} className="form-control" id="exampleInputName1" placeholder="Name" autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" onChange={this.handleEmailChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" autoComplete="off" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" onChange={this.handlePasswordChange} className="form-control" id="exampleInputPassword1" aria-describedby="passwordHelp" placeholder="Password" autoComplete="off" />
              <small id="passwordHelp" className="form-text text-muted">Minimum 7 characters.</small>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary form-control" id="bigger-button">Get Started!</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateUserPage;
