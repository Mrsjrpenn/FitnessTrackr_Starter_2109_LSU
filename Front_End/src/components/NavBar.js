import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <header>
        <h1>Fitness Tracker</h1>
      </header>
      <div>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink>Routines</NavLink>
        <NavLink>My Routines</NavLink>
        <NavLink>Activities</NavLink>
        <NavLink>Login</NavLink>
        <NavLink>Register</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
