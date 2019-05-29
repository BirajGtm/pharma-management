import React from "react";
import { Container, Header } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

class Sales extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isAuthenticated === false) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <br />
        <Container>
          <Header as="h2">Hello</Header>
          <p>This is sales</p>
        </Container>
      </div>
    );
  }
}

export default Sales;
