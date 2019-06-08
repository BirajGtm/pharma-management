import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Medicines from "./Medicines";
import Sales from "./Sales";
import SignUp from "./SignUp";
import Login from "./Login";
import Nav from "./Nav";
import auth from "./config/auth";
import AddMed from "./AddMed";

class RoutePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const userData = auth.checkCookie() === "NEED_TO_LOGIN" ? false : true;
    return (
      <BrowserRouter>
        <Nav isAuthenticated={userData} />
        <div>
          <Route
            path="/"
            exact
            component={() => <Home isAuthenticated={userData} />}
          />
          <Route
            path="/medicines/"
            component={() => <Medicines isAuthenticated={userData} />}
          />
          <Route
            path="/addmedicine/"
            component={() => <AddMed isAuthenticated={userData} />}
          />
          <Route
            path="/sales/"
            component={() => <Sales isAuthenticated={userData} />}
          />
          <Route
            path="/signup/"
            component={() => <SignUp isAuthenticated={userData} />}
          />
          <Route
            path="/login/"
            component={() => <Login isAuthenticated={userData} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default RoutePage;
