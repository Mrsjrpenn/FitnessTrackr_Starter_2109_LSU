import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { getUser } from "../Api/usersApi";
import NavBar from "./NavBar";
import PublicRoutines from "./Routines/PublicRoutines";
import RegisterForm from "./User/RegistrationForm";
import LoginForm from "./User/LoginForm";
import Activities from "./Activities/Activities";
import MyRoutines from "./Routines/MyRoutines";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theUsername, setTheUsername] = useState("");

  useEffect(() => {
    const authenticateUser = async () => {
      const user = await getUser(token);
      if(user){
      setTheUsername(user.username);
      setIsLoggedIn(true);
      }else {localStorage.clear()
            setToken('')
      }
    };
    authenticateUser();
  }, [token]);

  return (
    <main>
      <Router>
        <NavBar
          setIsLoggedIn={setIsLoggedIn}
          setToken={setToken}
          isLoggedIn={isLoggedIn}
          theUsername={theUsername}
        />
        <Switch>
          <Route path="/routines">
            <PublicRoutines />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/login">
            <LoginForm
              setToken={setToken}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              setTheUsername={setTheUsername}
              theUsername={theUsername}
            />
          </Route>
          <Route path="/activities">
            <Activities isLoggedIn={isLoggedIn} token={token} />
          </Route>
          <Route path={`/:username/myroutines`}>
            <MyRoutines token={token} />
          </Route>
        </Switch>
      </Router>
    </main>
  );
};

export default App;
