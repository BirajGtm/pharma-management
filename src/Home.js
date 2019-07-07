import React from "react";
import { Grid, Header } from "semantic-ui-react";
import { Redirect, Link } from "react-router-dom";
import auth from "./config/auth";

class Home extends React.Component {
  render() {
    if (this.props.isAuthenticated === false) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Hello {localStorage.getItem("user")}
            </Header>
            <Header as="h4">
              Use following links to access the pages directly:
            </Header>
          </Grid.Column>
        </Grid>
        <div className="ui fluid two item menu">
          <Link className="item" to="/medicines">
            List Medicine
          </Link>
          <Link className="item" to="/addmedicine">
            Add Medicine
          </Link>
        </div>
        <div className="ui fluid two item menu">
          <Link className="item" to="/sales">
            Sale
          </Link>
          <Link className="item" to="/stockssold">
            Stocks Sold
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
