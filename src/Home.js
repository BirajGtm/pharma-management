import React from "react";
import { Grid, Header } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import auth from "./config/auth";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false
    };
  }

  componentWillMount() {
    // if (user.length === 0) {
    //   this.setState({ redirectToLogin: true });
    // }
  }

  render() {
    // if ((this.props.user.length = 0)) {
    //   return <Redirect to="/login" />;
    // }
    console.log(this.props, "user from home");
    return (
      <div className="login-form">
        {/*
        Heads up! The styles below are necessary for the correct render of this example.
        You can do same with CSS, the main idea is that all the elements up to the `Grid`
        below must have a height of 100%.
      */}

        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              hello user
            </Header>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Home;
