import React from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: "",
      error: false,
      errorMessage: ""
    };
    this.handleSignup = this.handleSignup.bind(this);
  }

  async handleSignup(e) {
    e.preventDefault();
    if (this.state.email.length < 5) {
      this.setState({
        error: true,
        errorMessage: "Enter a valid email address."
      });
      return;
    }
    if (this.state.username.length < 1) {
      this.setState({
        error: true,
        errorMessage: "Enter a valid username."
      });
      return;
    }
    if (
      this.state.password !== this.state.password2 ||
      this.state.password.length < 6
    ) {
      this.setState({
        error: true,
        errorMessage: "Your passwords should not be less than 6 characters."
      });
      return;
    }

    await axios.post("http://localhost:5000/api/signup", {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    if (this.props.isAuthenticated === true) {
      return <Redirect to="/" />;
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
              Create a new account!
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  type="email"
                  required
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  value={this.state.email}
                  onChange={event =>
                    this.setState({ email: event.target.value })
                  }
                />
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
                  type="password"
                  required
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={event =>
                    this.setState({ password: event.target.value })
                  }
                />
                <Form.Input
                  fluid
                  type="password"
                  required
                  icon="lock"
                  iconPosition="left"
                  placeholder="Re-enter Your Password"
                  value={this.state.password2}
                  onChange={event =>
                    this.setState({ password2: event.target.value })
                  }
                />
                {this.state.error && (
                  <Segment clearing>
                    <Header as="h6" color="red">
                      {this.state.errorMessage}
                    </Header>
                  </Segment>
                )}
                {this.state.password !== this.state.password2 && (
                  <Segment clearing>
                    <Header as="h6" color="red">
                      Your Passwords do not match.
                    </Header>
                  </Segment>
                )}

                <Button
                  onClick={this.handleSignup}
                  color="teal"
                  fluid
                  size="large"
                >
                  Sign Up
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default SignUp;
