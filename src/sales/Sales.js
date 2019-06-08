import React from "react";
import { Container, Header } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import SaleNav from "./SaleNav";
import axios from "axios";

class Sales extends React.Component {
  constructor(props) {
    super(props);
    this.state = { medicines: [] };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/list").then(res => {
      this.setState({ medicines: res.data });
    });
  }

  render() {
    if (this.props.isAuthenticated === false) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <br />
        <Container>
          <SaleNav />
          <table className="ui blue celled selectable table">
            <thead className="">
              <tr className="">
                <th className="">Name</th>
                <th className="">Cost</th>
                <th className="">NOS</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {this.state.medicines.map(item => (
                <tr key={item._id} className="">
                  <td className="">{item.name}</td>
                  <td className="">{item.cost}</td>
                  <td className="">{item.total}</td>
                  <td className="">action</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </div>
    );
  }
}

export default Sales;
