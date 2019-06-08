import React from "react";
import { Link } from "react-router-dom";

class MedNav extends React.Component {
  render() {
    return (
      <div className="ui fluid three item menu">
        <Link className="item" to="/medicines">
          List Medicine
        </Link>
        <Link className="item" to="/addmedicine">
          Add Medicine
        </Link>
      </div>
    );
  }
}

export default MedNav;
