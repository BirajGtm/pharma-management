import React from "react";
import { Container } from "semantic-ui-react";
import SaleNav from "./SaleNav";
import axios from "axios";
import auth from "../config/auth";

class StocksSold extends React.Component {
  constructor(props) {
    super(props);
    this.state = { medicines: [] };
  }
  componentWillMount() {
    if (this.props.isAuthenticated === false) {
      return;
    } else {
      axios
        .get("http://localhost:5000/api/medicine/sales", {
          headers: { authorization: `Bearer ${auth.checkCookie()}` }
        })
        .then(res => {
          this.setState({ medicines: res.data });
          console.log(res.data);
        });
    }
  }
  render() {
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
