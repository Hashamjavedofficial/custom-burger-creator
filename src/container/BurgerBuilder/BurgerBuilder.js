import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BurgerContorls from "../../components/Burger/BuildControls/BuildControls";
const INGREDIENT_PRICE = {
  salad: 0.4,
  cheese: 0.5,
  bacon: 0.8,
  meat: 1.5,
};
class BugerBuilder extends Component {
  state = {
    ingredients: {
      cheese: 0,
      salad: 0,
      bacon: 0,
      meat: 0,
    },
    totalPrice: 4,
  };
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updateIngredient = {
      ...this.state.ingredients,
    };
    updateIngredient[type] = newCount;
    const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
    console.log(updateIngredient);
    console.log(newTotalPrice);

    this.setState({
      ingredients: updateIngredient,
      totalPrice: newTotalPrice,
    });
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const oldIngredients = {
      ...this.state.ingredients,
    };

    if (oldIngredients[type] === 0) {
      alert(`${type} is not present`);
    } else {
      oldIngredients[type] = oldCount - 1;
      const updatedTotal = this.state.totalPrice - INGREDIENT_PRICE[type];
      this.setState({
        ingredients: oldIngredients,
        totalPrice: updatedTotal,
      });
    }
  };
  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BurgerContorls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
        />
      </Aux>
    );
  }
}

export default BugerBuilder;
