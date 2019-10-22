import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/auth-context';

const navbar =  props => (
  <AuthContext.Consumer>
    {context => {
        return (
          <nav className="navbar navbar-light bg-light">
            <div className="navbar-brand" >
              <div className="nav-left">
                <div className="nav-left-content">
                  <NavLink to="/profile" id="profile-link"><span>countryLookup</span><img src="world.svg" alt="world-logo"/></NavLink>
                </div>
              </div>
              <div className="nav-right">
                {!context.token && (
                  <NavLink to="/register" id="link"><span className="margin-right">Register</span></NavLink>
                )}
                {!context.token && (
                  <NavLink to="/login" id="link">Login</NavLink>
                )}
                {context.token && (
                  <span onClick={context.logout} id="link">Logout</span>
                )}
              </div>
            </div>
          </nav>
        );
    }}
  </AuthContext.Consumer>
);

export default navbar;
