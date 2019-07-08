import React from "react";
import { Container, Button, Modal } from "semantic-ui-react";
import axios from "axios";
import Delete from "./Delete";
import auth from "../config/auth";
import { Redirect } from "react-router-dom";
import Update from "./Update";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      login: true
    };
  }

  async componentDidMount() {
    let data = await axios.get("http://localhost:5000/api/users", {
      headers: { authorization: `Bearer ${auth.checkCookie()}` }
    });
    if (
      data.data.message != undefined &&
      data.data.message === "Authorization Error"
    ) {
      this.setState({ login: false });
    }
    if (data.data.users != undefined) {
      this.setState({ users: data.data.users });
    }
    console.log(data, "users");
  }
  render() {
    if (this.state.login == false) {
      return <Redirect to="/login" />;
    }
    console.log(this.state.users, "users");
    return (
      <div>
        <Container>
          <table className="ui green celled selectable table">
            <thead className="">
              <tr className="">
                <th className="">Email</th>
                <th className="">Username</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {this.state.users.map(item => (
                <tr key={item._id} className="">
                  <td className="">{item.email}</td>
                  <td className="">{item.username}</td>
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

export default Users;
