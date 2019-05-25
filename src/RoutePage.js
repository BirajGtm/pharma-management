import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Medicines from "./Medicines";
import Sales from "./Sales";
import SignUp from "./SignUp";
import Nav from "./Nav";

function RoutePage() {
  return (
    <BrowserRouter>
      <Nav />
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/medicines/" component={Medicines} />
        <Route path="/sales/" component={Sales} />
        <Route path="/signup/" component={SignUp} />
      </div>
    </BrowserRouter>
  );
}

export default RoutePage;
