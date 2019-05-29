import React from "react";
import { Link, Redirect } from "react-router-dom";
import auth from "./config/auth";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "home", loggedIn: true };

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
        <Link to="/">
          <span
            onClick={() => this.setState({ activeItem: "home" })}
            className={
              this.state.activeItem === "home" ? "active item" : "item"
            }
          >
            Home
          </span>
        </Link>
        <Link to="/medicines">
          <span
            onClick={() => this.setState({ activeItem: "medicines" })}
            className={
              this.state.activeItem === "medicines" ? "active item" : "item"
            }
          >
            Medicines
          </span>
        </Link>
        <Link to="/sales">
          <span
            onClick={() => this.setState({ activeItem: "sales" })}
            className={
              this.state.activeItem === "sales" ? "active item" : "item"
            }
          >
            Sales
          </span>
        </Link>
        {this.props.isAuthenticated === true ? (
          <a href="#" onClick={this.deleteUser}>
            <span onClick={this.deleteUser} className="item">
              Logout
            </span>
          </a>
        ) : (
          <Link to="/login">
            <span className="active item">Login</span>
          </Link>
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
