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
    // this.routeChange = this.routeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  // routeChange = () => {
  //   let path = `/login`;
  //   this.props.history.push(path);
  // }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
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
      "name": this.state.name,
      "email": this.state.email,
      "password": this.state.password
    }

    // console.log(user)

    fetch('/users', {
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
      <div className="container" id="container-padding">
      <img src="register.svg" alt="log-in" className="login-img" />
      <h2 className="text-center my-5">Create An Account</h2>
        <div className="form-content">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputName1" className="form-label">Name</label>
              <input type="text" onChange={this.handleNameChange} className="form-control" id="exampleInputName1" placeholder="Name" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" onChange={this.handleEmailChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" onChange={this.handlePasswordChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
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
