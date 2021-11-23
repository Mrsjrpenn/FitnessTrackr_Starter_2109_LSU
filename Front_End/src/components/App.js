import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NavBar from "./NavBar";

const App = () => {
  // components go here
  return (
    <main>
      <Router>
        <NavBar />
      </Router>
    </main>
  );
};

export default App;
