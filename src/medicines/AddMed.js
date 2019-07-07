import React from "react";
import { Container, Form, Button, Header, Message } from "semantic-ui-react";
import axios from "axios";
import MedNav from "./MedNav";
import auth from "../config/auth";

class AddMed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mfgDate: new Date().toISOString().substring(0, 10),
      expDate: new Date().toISOString().substring(0, 10),
      cost: 0,
      total: 0,
      name: "",
      error: false,
      errMsg: "",
      success: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.state.name === "") {
      this.setState({
        error: true,
        errMsg: "Please provide a valid name!"
      });
      return;
    }
    if (this.state.mfgDate === "") {
      this.setState({
        error: true,
        errMsg: "Please provide a valid Manufacture date!"
      });
      return;
    }
    if (this.state.expDate === "") {
      this.setState({
        error: true,
        errMsg: "Please provide a valid Expiry date!"
      });
      return;
    }
    if (this.state.cost === 0) {
      this.setState({
        error: true,
        errMsg: "Please provide a valid cost that is not '0'!"
      });
      return;
    }
    if (this.state.total === 0) {
      this.setState({
        error: true,
        errMsg: "Please provide a valid total stock that is not '0'!"
      });
      return;
    }

    let meddata = {
      name: this.state.name,
      cost: Number(this.state.cost),
      mfd: new Date(this.state.mfgDate),
      exd: new Date(this.state.expDate),
      total: Number(this.state.total)
    };
    let data = await axios.post("http://localhost:5000/api/save", {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${auth.checkCookie()}`
      },
      ...meddata
    });
    if (data.data.success === true) {
      this.setState({
        success: true,
        error: false,
        errMsg: `${data.data.medicine} was added successfully!`,
        cost: 0,
        total: 0,
        mfgDate: new Date().toISOString().substring(0, 10),
        expDate: new Date().toISOString().substring(0, 10),
        name: ""
      });
    }
    if (data.data.success === false) {
      this.setState({
        error: true,
        success: false,
        errMsg: data.data.message
      });
    }
  }

  render() {
    return (
      <Container>
        <MedNav />
        <Header color="teal" as="h2">
          Add Medicine
        </Header>

        <hr />
        <Form>
          <Form.Field>
            <label>Medicine Name</label>
            <input
              value={this.state.name}
              onChange={event => {
                this.setState({
                  name: event.target.value,
                  error: false,
                  success: false
                });
              }}
              placeholder="Name"
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Manufacture Date</label>
              <input
                value={this.state.mfgDate}
                onChange={event => {
                  this.setState({
                    mfgDate: event.target.value,
                    error: false,
                    success: false
                  });
                }}
                type="date"
                name="mfgdate"
              />
            </Form.Field>
            <Form.Field>
              <label>Expiry Date</label>
              <input
                value={this.state.expDate}
                onChange={event => {
                  this.setState({
                    expDate: event.target.value,
                    error: false,
                    success: false
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
                    error: false,
                    success: false
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
                    error: false,
                    success: false
                  });
                }}
                type="number"
                placeholder="Stock Total"
              />
            </Form.Field>
          </Form.Group>
          {this.state.error && (
            <Message color="red">
              <Message.Header>Error:</Message.Header>
              <p>{this.state.errMsg}</p>
            </Message>
          )}
          {this.state.success && (
            <Message color="green">
              <Message.Header>Success:</Message.Header>
              <p>{this.state.errMsg}</p>
            </Message>
          )}
          <Button
            onClick={e => this.handleSubmit(e)}
            color="teal"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default AddMed;
