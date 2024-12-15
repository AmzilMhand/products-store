import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css"; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <ul>
            <li>
              <NavLink to="/about" activeClassName="active-link" className="footer-link">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName="active-link" className="footer-link">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/terms" activeClassName="active-link" className="footer-link">
                Terms of Service
              </NavLink>
            </li>
            <li>
              <NavLink to="/privacy" activeClassName="active-link" className="footer-link" >
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
        <p>&copy; 2024 AmzilStore. All Rights Reserved.</p>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
