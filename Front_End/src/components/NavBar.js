import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <header>
        <h1>Fitness Tracker</h1>
      </header>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/routines">Routines</NavLink>
        {/*<NavLink>My Routines</NavLink>*/}
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
