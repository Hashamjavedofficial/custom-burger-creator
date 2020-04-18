import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
class BugerBuilder extends Component {
  render() {
    return (
      <Aux>
        <Burger /> <div>Burger Tools</div>
      </Aux>
    );
  }
}

export default BugerBuilder;
