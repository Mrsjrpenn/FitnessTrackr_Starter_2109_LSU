import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NavBar from "./NavBar";

const App = () => {
  // components go here
  return (
    <main>
      <Router>
        <NavBar />
        <Switch>
          <Route exact to='/'>
            
          </Route>
        </Switch>
      </Router>
    </main>
  );
};

export default App;
