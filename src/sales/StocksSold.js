import React from "react";
import { Container } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import SaleNav from "./SaleNav";
import axios from "axios";

class StocksSold extends React.Component {
  constructor(props) {
    super(props);
    this.state = { medicines: [] };
  }
  componentWillMount() {
    if (this.props.isAuthenticated === false) {
      return;
    } else {
      axios.get("http://localhost:5000/api/sales").then(res => {
        this.setState({ medicines: res.data });
        console.log(res.data);
      });
    }
  }
  render() {
    if (this.props.isAuthenticated === false) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <Container>
          <SaleNav />
          <br />
          <table className="ui green celled selectable table">
            <thead className="">
              <tr className="">
                <th className="">Name</th>
                <th className="">Cost</th>
                <th className="">Sold</th>
              </tr>
            </thead>
            <tbody className="">
              {this.state.medicines.map(item => (
                <tr key={item._id} className="">
                  <td className="">{item.name}</td>
                  <td className="">{item.cost}</td>
                  <td className="">{item.sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </div>
    );
  }
}

export default StocksSold;
