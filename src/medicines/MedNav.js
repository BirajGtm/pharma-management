import React from "react";
import { NavLink } from "react-router-dom";

class MedNav extends React.Component {
  render() {
    return (
      <div className="ui fluid two item menu">
        <NavLink className="item" to="/medicines">
          List Medicine
        </NavLink>
        <NavLink className="item" to="/addmedicine">
          Add Medicine
        </NavLink>
      </div>
    );
  }
}

export default MedNav;
