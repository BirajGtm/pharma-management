import React from "react";
import { Button, Modal, Divider, Message, Form } from "semantic-ui-react";
import axios from "axios";

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.item.name,
      cost: this.props.item.cost,
      mfd: this.props.item.mfd.substring(0, 10),
      exd: this.props.item.exd.substring(0, 10),
      total: this.props.item.total,
      updated: false,
      reload: false,
      error: false
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async handleUpdate() {
    const item = {
      name: this.state.name,
      cost: Number(this.state.cost),
      mfd: new Date(this.state.mfd),
      exd: new Date(this.state.exd),
      total: Number(this.state.total),
      _id: this.props.item._id
    };
    let data = await axios.post("http://localhost:5000/api/update", {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      ...item
    });
    if (data.data === "UPDATE SUCCESS") {
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
              <label>Medicine Name</label>
              <input
                value={this.state.name}
                onChange={event => {
                  this.setState({
                    name: event.target.value,
                    updated: false,
                    error: false
                  });
                }}
                placeholder="Name"
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Manufacture Date</label>
                <input
                  value={this.state.mfd}
                  onChange={event => {
                    this.setState({
                      mfd: event.target.value,
                      updated: false,
                      error: false
                    });
                  }}
                  type="date"
                  name="mfgdate"
                />
              </Form.Field>
              <Form.Field>
                <label>Expiry Date</label>
                <input
                  value={this.state.exd}
                  onChange={event => {
                    this.setState({
                      exd: event.target.value,
                      updated: false,
                      error: false
                    });
                  }}
                  type="date"
                  name="expdate"
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Cost</label>
                <input
                  value={this.state.cost}
                  onChange={event => {
                    this.setState({
                      cost: event.target.value,
                      updated: false,
                      error: false
                    });
                  }}
                  type="number"
                  placeholder="Cost"
                />
              </Form.Field>
              <Form.Field>
                <label>Total Stock Available</label>
                <input
                  value={this.state.total}
                  onChange={event => {
                    this.setState({
                      total: event.target.value,
                      updated: false,
                      error: false
                    });
                  }}
                  type="number"
                  placeholder="Stock Total"
                />
              </Form.Field>
            </Form.Group>
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
