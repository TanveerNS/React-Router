import React from "react";
import {
  BrowserRouter,
  Route,
  NavLink,
  Redirect,
  Prompt
} from "react-router-dom";
import About from "./components/About";
import { useState } from "react";

import "./styles.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [age, setAge] = useState(null);

  function onClickHandle() {
    setLoggedIn(!loggedIn);
  }
  function onChangeHandle(e) {
    setAge(e.target.value);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <ul className="ul-style">
            <li className="li-style">
              <NavLink
                className="App-link"
                to="/"
                exact
                activeClassName="Link-active-style"
              >
                Home
              </NavLink>
            </li>
            <li className="li-style">
              <NavLink
                className="App-link"
                to="/about"
                exact
                activeClassName="Link-active-style"
              >
                About
              </NavLink>
            </li>
            <li className="li-style">
              <NavLink
                className="App-link"
                to="/contact"
                exact
                activeClassName="Link-active-style"
              >
                Contact
              </NavLink>
            </li>
            <li className="li-style">
              <NavLink
                className="App-link"
                to="/user/john/doe"
                exact
                activeClassName="Link-active-style"
              >
                User John Doe
              </NavLink>
            </li>
          </ul>
          <Prompt
            when={loggedIn && !age}
            message={(location) => {
              return location.pathname.startsWith("/user")
                ? true
                : "are you sure?";
            }}
          />

          <button className="button" onClick={onClickHandle}>
            {loggedIn ? "Logout" : "Login"}
          </button>
          <Route
            path="/"
            exact
            render={() => {
              return <h1>Welcome Home</h1>;
            }}
          />
          <Route path="/about" exact component={About} />
          <Route
            path="/user/:firstname/:lastname"
            exact
            render={({ match }) => {
              return loggedIn ? (
                <div>
                  <h5>Age: {age}</h5>
                  <input type="text" value={age} onChange={onChangeHandle} />

                  <p>
                    Welcome {match.params.firstname} {match.params.lastname}
                  </p>
                </div>
              ) : (
                <Redirect to="/" />
              );
            }}
          />
        </header>
      </div>
    </BrowserRouter>
  );
}
