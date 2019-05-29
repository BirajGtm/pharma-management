import React from "react";
import { Container, Header } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import axios from "axios";

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
        console.log(res, "response");
        this.setState({ medicines: res.data });
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
          <table className="ui blue celled selectable table">
            <thead className="">
              <tr className="">
                <th className="">Name</th>
                <th className="">Cost</th>
                <th className="">NOS</th>
                <th className="">Mfg Date</th>
                <th className="">Exp Date</th>
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
