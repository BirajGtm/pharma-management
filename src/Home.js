import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", error: false, errorMessage: "" };

    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin(e) {
    e.preventDefault();
    let data = await axios.post("http://localhost:5000/api/login", {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      username: this.state.username,
      password: this.state.password
    });
    console.log(data, "login response");

    if (data.data !== "USERNAME OR PASSWORD IS INVALID") {
      sessionStorage.setItem("userEmail", data.data);
      this.setState({
        error: false
      });
    } else {
      this.setState({
        error: true,
        errorMessage: "USERNAME OR PASSWORD IS INVALID"
      });
    }
  }
  render() {
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
              Log-in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  type="text"
                  required
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={event =>
                    this.setState({ username: event.target.value })
                  }
                />
                <Form.Input
                  fluid
                  required
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={event =>
                    this.setState({ password: event.target.value })
                  }
                />
                {this.state.error && (
                  <Segment clearing>
                    <Header as="h6" color="red">
                      {this.state.errorMessage}
                    </Header>
                  </Segment>
                )}
                <Button
                  onClick={this.handleLogin}
                  color="teal"
                  fluid
                  size="large"
                >
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to="/signup">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Home;
