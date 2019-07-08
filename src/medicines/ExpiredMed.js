import React from "react";
import MedNav from "./MedNav";
import { Container } from "semantic-ui-react";
import axios from "axios";
import auth from "../config/auth";
import { Redirect } from "react-router-dom";

class ExpiredMed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medicines: [],
      login: true
    };
  }
  async componentDidMount() {
    let data = await axios.get("http://localhost:5000/api/medicine/expired", {
      headers: { authorization: `Bearer ${auth.checkCookie()}` }
    });
    if (
      data.data.message != undefined &&
      data.data.message === "Authorization Error"
    ) {
      this.setState({ login: false });
    }
    if (data.data.meds != undefined) {
      this.setState({ medicines: data.data.meds });
    }
  }
  render() {
    if (this.state.login == false) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Container>
          <MedNav />
          <table className="ui red celled selectable table">
            <thead className="">
              <tr className="">
                <th className="">Name</th>
                <th className="">Cost</th>
                <th className="">NOS</th>
              </tr>
            </thead>
            <tbody className="">
              {this.state.medicines.map(item => (
                <tr key={item._id} className="">
                  <td className="">{item.name}</td>
                  <td className="">{item.cost}</td>
                  <td className="">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </div>
    );
  }
}

export default ExpiredMed;
