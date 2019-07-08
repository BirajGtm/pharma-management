import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Medicines from "./medicines/Medicines";
import Sales from "./sales/Sales";
import SignUp from "./SignUp";
import Login from "./Login";
import Nav from "./Nav";
import auth from "./config/auth";
import AddMed from "./medicines/AddMed";
import StocksSold from "./sales/StocksSold";
import ExpiredMed from "./medicines/ExpiredMed";
import Users from "./users/Users";

class RoutePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: auth.checkCookie() === "NEED_TO_LOGIN" ? false : true
    };
  }
  render() {
    console.log(auth.checkCookie(), "cookie");
    const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route
          {...rest}
          render={props =>
            this.state.userData ? (
              <Component {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      );
    };
    return (
      <BrowserRouter>
        <Nav isAuthenticated={this.state.userData} />
        <div>
          <PrivateRoute component={Home} path="/" exact />
          <PrivateRoute component={Medicines} path="/medicines/" />
          <PrivateRoute component={AddMed} path="/addmedicine/" />
          <PrivateRoute component={Sales} path="/sales" />
          <PrivateRoute component={StocksSold} path="/stockssold" />
          <PrivateRoute component={ExpiredMed} path="/expired" />
          <PrivateRoute component={Users} path="/users" />
          <Route
            component={() => <SignUp isAuthenticated={this.state.userData} />}
            path="/signup/"
          />
          <Route
            path="/login/"
            component={() => <Login isAuthenticated={this.state.userData} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default RoutePage;
