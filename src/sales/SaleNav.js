import React from "react";
import { NavLink } from "react-router-dom";

class MedNav extends React.Component {
  render() {
    return (
      <div className="ui fluid two item menu">
        <NavLink className="item" to="/sales">
          Sale
        </NavLink>
        <NavLink className="item" to="/stockssold">
          Stocks Sold
        </NavLink>
      </div>
    );
  }
}

export default MedNav;
