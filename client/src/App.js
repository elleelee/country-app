import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from './pages/auth'
import CreateUserPage from './pages/create_user'
import ProfilePage from './pages/profile'
import Navbar from './components/navbar'
import Footer from './components/footer'
import AuthContext from './context/auth-context'

import './stylesheets/index.css';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value = {{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
          <Navbar />
            <Switch>
              {this.state.token && <Redirect from="/" to="/profile" exact />}
              {this.state.token && <Redirect from="/register" to="/login" exact />}
              {this.state.token && <Redirect from="/login" to="/profile" exact />}

              {!this.state.token && (
                <Route path="/login" component={AuthPage} />
              )}
              {!this.state.token && (
                <Route path="/register" component={CreateUserPage} />
              )}
              {this.state.token && (
                <Route path="/profile" component={ProfilePage} />
              )}
              {!this.state.token && <Redirect to="/login" exact />}
            </Switch>
          <Footer />
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
