import React, { Component } from "react";

class Footer extends Component {

  render() {
    return (
      <div className="footer">
        <div className="footer-links">
          <a href="https://github.com/elleelee" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          <a href="https://www.linkedin.com/in/ellenleelbs/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
        </div>
        <div className="footer-copyright">
          <img src="" alt="" className="footer-img"/>
          This web app was created by Ellen Lee
        </div>
      </div>
    );
  }
}

export default Footer;
