import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BurgerContorls from "../../components/Burger/BuildControls/BuildControls";
class BugerBuilder extends Component {
  state = {
    ingredients: {
      cheese: 0,
      salad: 0,
      bacon: 0,
      meat: 0,
    },
  };
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updateIngredient = {
      ...this.ingredients,
    };
    updateIngredient.ingredients[type] = newCount;
    this.setState({
      ingredients: updateIngredient,
    });
  };
  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BurgerContorls />
      </Aux>
    );
  }
}

export default BugerBuilder;
