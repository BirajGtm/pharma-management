import React from "react";
import { Button, Modal, Divider, Message, Form } from "semantic-ui-react";
import axios from "axios";
import auth from "../config/auth";

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.item.email,
      username: this.props.item.username,
      updated: false,
      reload: false,
      error: false
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async handleUpdate() {
    const userdata = {
      _id: this.props.item._id,
      username: this.state.username
    };
    let data = await axios.post(
      "http://localhost:5000/api/user/update",
      {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        ...userdata
      },
      {
        headers: { authorization: `Bearer ${auth.checkCookie()}` }
      }
    );
    if (data.data.message === "User Updated") {
      this.setState({ updated: true });
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    if (this.state.reload) {
      window.location.reload();
    }
    console.log(this.props.item, "data from props");
    return (
      <Modal.Content image>
        <Modal.Description>
          {this.state.updated && (
            <Message color="teal">
              <Message.Header>Success:</Message.Header>
              <p>Successfully Updated!</p>
            </Message>
          )}
          {this.state.error && (
            <Message
              onClick={() => this.setState({ error: false })}
              color="red"
            >
              <Message.Header>Error:</Message.Header>
              <p>
                There was some error when running your request. Please try again
                later!
              </p>
            </Message>
          )}
          <Form>
            <Form.Field>
              <label>Email</label>
              <input value={this.state.email} disabled placeholder="Name" />
            </Form.Field>

            <Form.Field>
              <label>Username</label>
              <input
                value={this.state.username}
                onChange={event =>
                  this.setState({ username: event.target.value })
                }
                type="text"
                name="username"
              />
            </Form.Field>
          </Form>

          <Divider />
          <Button
            onClick={() => this.setState({ reload: true })}
            inverted
            color="teal"
            type="submit"
          >
            Close & Reload
          </Button>
          <Button
            onClick={this.handleUpdate}
            inverted
            color="green"
            type="submit"
          >
            Update
          </Button>
        </Modal.Description>
      </Modal.Content>
    );
  }
}

export default Update;
