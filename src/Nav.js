import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "home" };
  }

  render() {
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
        <Link to="/login">
          <span
            onClick={() => this.setState({ activeItem: "login" })}
            className={
              this.state.activeItem === "login" ? "active item" : "item"
            }
          >
            Login
          </span>
        </Link>

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
