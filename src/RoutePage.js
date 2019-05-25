import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Medicines from "./Medicines";
import Sales from "./Sales";
import SignUp from "./SignUp";
import Nav from "./Nav";
import auth from "./config/auth";

class RoutePage extends React.Component {
  constructor(props) {
    super(props);
    this.userData = "";
  }

  componentDidMount() {
    this.userData = auth.getCookie();
  }

  render() {
    return (
      <BrowserRouter>
        <Nav />
        <div>
          <Route user={this.userData} path="/" exact component={Home} />
          <Route
            user={this.userData}
            path="/medicines/"
            component={Medicines}
          />
          <Route user={this.userData} path="/sales/" component={Sales} />
          <Route path="/signup/" component={SignUp} />
        </div>
      </BrowserRouter>
    );
  }
}

export default RoutePage;
