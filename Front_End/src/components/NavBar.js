import React from "react";
import { NavLink, useHistory } from "react-router-dom";

const NavBar = ({setIsLoggedIn, setToken, isLoggedIn, theUsername}) => {
  const history = useHistory();

  const handleClick = () => {
    setToken("");
    setIsLoggedIn(false);
    localStorage.clear('token');
    history.push("/")
  }

  return (
    <nav>
      <header>
        <h1>Fitness Tracker</h1>
      </header>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/routines">Routines</NavLink>
        { isLoggedIn ? <NavLink to={`/${theUsername}/myroutines`} >My Routines</NavLink> : null}
        <NavLink to="/activities">Activities</NavLink>
        { isLoggedIn ? null : <NavLink to="/login">Login</NavLink>}
        { isLoggedIn ? null : <NavLink to="/register">Register</NavLink>}
        { isLoggedIn ? <button onClick={handleClick}>Logout</button> : null }
      </div>
    </nav>
  );
};

export default NavBar;
