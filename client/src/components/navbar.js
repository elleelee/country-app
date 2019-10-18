import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../context/auth-context'

const navbar =  props => (
  <AuthContext.Consumer>
    {context => {
        return (
          <nav className="navbar navbar-light bg-light">
            <div className="navbar-brand" >
              <div className="nav-left">
                <div className="nav-left-content">
                  <p>countryLookup</p>
                  <img src="world.svg" alt="world-logo"/>
                </div>
              </div>
              <div className="nav-right">
                {!context.token && (
                  <NavLink to="/register"><span className="margin-right">Register</span></NavLink>
                )}
                {!context.token && (
                  <NavLink to="/login">Login</NavLink>
                )}
                {context.token && (
                  <span onClick={context.logout} className="logout">Logout</span>
                )}
              </div>
            </div>
          </nav>
        );
    }}
  </AuthContext.Consumer>
);

export default navbar;
