import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import PublicRoutines from "./Routines/PublicRoutines";
import RegisterForm from "./User/RegistrationForm";
import LoginForm from "./User/LoginForm";
import Activities from "./Activities/Activities";

const App = () => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/routines">
            <PublicRoutines />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/login">
            <LoginForm setToken={setToken} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/activities">
            <Activities />
          </Route>
        </Switch>
      </Router>
    </main>
  );
};

export default App;
