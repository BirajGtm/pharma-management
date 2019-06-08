import React from "react";
import { Link } from "react-router-dom";

class MedNav extends React.Component {
  render() {
    return (
      <div className="ui fluid three item menu">
        <Link className="item" to="/sales">
          Sale
        </Link>
        <Link className="item" to="/stockssold">
          Stocks Sold
        </Link>
      </div>
    );
  }
}

export default MedNav;
