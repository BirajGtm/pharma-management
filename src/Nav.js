import React from "react";
import { NavLink } from "react-router-dom";
import auth from "./config/auth";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: true };

    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser() {
    auth.deleteCookie();
    this.setState({ loggedIn: false });
  }

  render() {
    if (this.state.loggedIn === false) {
      window.location.reload();
    }

    return (
      <div className="ui pointing menu">
        <NavLink className="item" exact to="/">
          Home
        </NavLink>
        <NavLink className="item" to="/medicines">
          Medicines
        </NavLink>
        <NavLink className="item" to="/sales">
          Sales
        </NavLink>
        {this.props.isAuthenticated === true ? (
          <a className="item" href="#" onClick={this.deleteUser}>
            Logout
          </a>
        ) : (
          <NavLink className="item" to="/login">
            Login
          </NavLink>
        )}

        <div className="right menu">
          <div className="item">
            <div className="ui icon input">
              <input type="text" placeholder="Search..." />
              <i aria-hidden="true" className="search icon" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
