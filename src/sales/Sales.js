import React from "react";
import { Container, Button } from "semantic-ui-react";
import SaleNav from "./SaleNav";
import axios from "axios";
import auth from "../config/auth";

class Sales extends React.Component {
  constructor(props) {
    super(props);
    this.state = { medicines: [], disabled: false };
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSellNumber = this.handleSellNumber.bind(this);
    this.handleSell = this.handleSell.bind(this);
    this.getMedicine = this.getMedicine.bind(this);
  }

  getMedicine() {
    axios
      .get("http://localhost:5000/api/medicine/list", {
        headers: { authorization: `Bearer ${auth.checkCookie()}` }
      })
      .then(res => {
        let medicines = res.data.map(item => {
          item.isChecked = false;
          item.sold = 0;
          return item;
        });
        this.setState({ medicines });
      });
  }

  componentDidMount() {
    this.getMedicine();
  }

  handleCheckbox(item, index) {
    let medicines = [...this.state.medicines];
    if (medicines[index].isChecked === true) {
      item.isChecked = false;
      medicines[index] = { ...item };
    } else if (medicines[index].isChecked === false) {
      item.isChecked = true;
      medicines[index] = { ...item };
    }
    this.setState({ medicines });
  }

  handleSellNumber(event, item, index) {
    if (item.total < event.target.value) {
      alert("Sales number can't be greater than total stock available!");
      return;
    }
    let medicines = [...this.state.medicines];
    item.sold = Number(event.target.value);
    medicines[index] = { ...item };
    this.setState({ medicines });
  }

  async handleSell() {
    this.setState({ disabled: true });
    let sales = this.state.medicines
      .filter(item => item.isChecked === true && item.sold > 0)
      .map(item => {
        return (item = { _id: item._id, total: Number(item.sold) });
      });
    if (sales.length === 0) {
      alert("Select at least one medicine before saving record!");
      this.setState({ disabled: false });
      return;
    }

    let data = await axios.post("http://localhost:5000/api/stocks-sold", {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      sales
    });
    console.log(data.data);
    if (data.data === "STOCKS UPDATED") {
      alert("Updated");
    }
    this.getMedicine();
    this.setState({ disabled: false });
  }

  render() {
    return (
      <div>
        <Container>
          <SaleNav />
          <br />
          <Button
            disabled={this.state.disabled}
            onClick={this.handleSell}
            inverted
            color="green"
          >
            Save Sale Record
          </Button>
          <table className="ui green celled selectable table">
            <thead className="">
              <tr className="">
                <th className="">Name</th>
                <th className="">Cost</th>
                <th className="">Total Available</th>
                <th className="">Selling?</th>

                <th className="">Sell NOs</th>
              </tr>
            </thead>
            <tbody className="">
              {this.state.medicines.map((item, index) => (
                <tr key={item._id} className="">
                  <td className="">{item.name}</td>
                  <td className="">{item.cost}</td>
                  <td className="">{item.total}</td>
                  <td className="">
                    <div className="ui checkbox">
                      <input
                        onChange={() => this.handleCheckbox(item, index)}
                        type="checkbox"
                        checked={item.isChecked}
                      />
                      <label> {item.isChecked ? "Yes" : "No"}</label>
                    </div>
                  </td>

                  <td className="">
                    <div className="ui focus input">
                      <input
                        type="number"
                        onChange={event =>
                          this.handleSellNumber(event, item, index)
                        }
                        value={item.sold}
                      />
                    </div>
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

export default Sales;
