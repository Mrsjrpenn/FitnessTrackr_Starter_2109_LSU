import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import PublicRoutines from "./Routines/PublicRoutines";

const App = () => {
  // components go here
  return (
    <main>
      <Router>
        <NavBar />
        <Route path="/PublicRoutines">
          <PublicRoutines />
        </Route>
      </Router>
    </main>
  );
};

export default App;
