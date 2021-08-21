import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Know Me</h1>
          <p className="lead">
            Want people to get to know you a little better? Register today!
          </p>

          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
        <p id="souceofimg">
          <a href="https://www.freepik.com/vectors/background">
            Background vector created by vector_corp - www.freepik.com
          </a>
        </p>
      </div>
    </section>
  );
};
export default Landing;
