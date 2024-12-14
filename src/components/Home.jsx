import React from "react";
import { Link } from "react-router-dom";
import { DotLottiePlayer } from "@dotlottie/react-player";

import "./Home.css";
function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="left-part">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to Amzil<span>Store</span>
            </h1>
            <p className="hero-subtitle">
              Explore exclusive deals, discover unique finds, and shop with
              confidence – your one-stop shop for all your needs.
            </p>
            <Link to="/products" className="Link">
              <button className="hero-button">
                <DotLottiePlayer
                  style={{ height: "40px" }}
                  src="robotAnimation.lottie"
                  autoplay
                  loop
                />
                See Products
              </button>
            </Link>
          </div>
        </div>
        <div className="right-part">
          <DotLottiePlayer src="Animation.lottie" autoplay loop />
        </div>
      </div>
    </div>
  );
}

export default Home;
