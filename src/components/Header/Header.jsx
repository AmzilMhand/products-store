import React from "react";
import { Link, NavLink } from "react-router-dom";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "./Header.css";
import { MdShoppingCart } from "react-icons/md";

const Header = () => {
  return (
    <header className="header">
      <div>
        <Link to="/" className="logo">
          <DotLottiePlayer style={{ height: "60px" }} src="logoAnimation.lottie" autoplay loop />
          <h1>Amzil<span>Store</span></h1>
        </Link>
      </div>

      <nav>
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/products">Products</NavLink>
        <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
        <NavLink className="nav-link" to="/cart"><MdShoppingCart  style={{fontSize: "16px"}}/></NavLink>
      </nav>
    </header>
  );
};

export default Header;
