import React from "react";
import { Button, Modal, Divider, Message } from "semantic-ui-react";
import axios from "axios";
import auth from "../config/auth";

class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted: false,
      error: false,
      reload: false
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleDelete() {
    let item = this.props.item;
    console.log(item, "user deleting");
    let data = await axios.post(
      "http://localhost:5000/api/user/delete",
      {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        ...item
      },
      {
        headers: { authorization: `Bearer ${auth.checkCookie()}` }
      }
    );
    if (data.data.message === "User Deleted") {
      this.setState({ deleted: true });
    } else {
      this.setState({ error: true });
    }
  }
  render() {
    if (this.state.reload) {
      window.location.reload();
    }
    return (
      <Modal.Content image>
        <Modal.Description>
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
          {this.state.deleted && (
            <Message
              onClick={() => this.setState({ error: false })}
              color="red"
            >
              <Message.Header>Success:</Message.Header>
              <p>Deleted Successfully.</p>
            </Message>
          )}
          <table className="ui red celled selectable table">
            <thead className="">
              <tr className="">
                <th className="">Emai;</th>
                <th className="">Username</th>
              </tr>
            </thead>
            <tbody>
              <tr key={this.props.item._id} className="">
                <td className="">{this.props.item.email}</td>
                <td className="">{this.props.item.username}</td>
              </tr>
            </tbody>
          </table>
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
            onClick={this.handleDelete}
            inverted
            color="red"
            type="submit"
          >
            Delete
          </Button>
        </Modal.Description>
      </Modal.Content>
    );
  }
}

export default Delete;
