import React from "react";
import { Container, Button, Modal, Divider, Message } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Delete from "./medicines/Delete";
import Update from "./medicines/Update";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medicines: []
    };
  }

  componentWillMount() {
    if (this.props.isAuthenticated === false) {
      return;
    } else {
      axios.get("http://localhost:5000/api/list").then(res => {
        this.setState({ medicines: res.data });
      });
    }
  }
  render() {
    if (this.props.isAuthenticated === false) {
      return <Redirect to="/login" />;
    }

    if (this.state.reload) {
      window.location.reload();
    }

    return (
      <div>
        <Container>
          <table className="ui blue celled selectable table">
            <thead className="">
              <tr className="">
                <th className="">Name</th>
                <th className="">Cost</th>
                <th className="">NOS</th>
                <th className="">Mfg Date</th>
                <th className="">Exp Date</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {this.state.medicines.map(item => (
                <tr key={item._id} className="">
                  <td className="">{item.name}</td>
                  <td className="">{item.cost}</td>
                  <td className="">{item.total}</td>
                  <td className="">{item.mfd.substring(0, 10)}</td>
                  <td className="">{item.exd.substring(0, 10)}</td>
                  <td className="">
                    {/* Modal for deletion */}
                    <Modal
                      trigger={
                        <Button inverted color="red" type="submit">
                          Delete
                        </Button>
                      }
                    >
                      <Modal.Header color="red">Confirm Delete?</Modal.Header>
                      <Delete item={item} />
                    </Modal>
                    {/* modal for update */}
                    <Modal
                      trigger={
                        <Button inverted color="green" type="submit">
                          Update
                        </Button>
                      }
                    >
                      <Modal.Header color="green">Confirm Update?</Modal.Header>
                      <Update item={item} />
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </div>
    );
  }
}

export default About;
