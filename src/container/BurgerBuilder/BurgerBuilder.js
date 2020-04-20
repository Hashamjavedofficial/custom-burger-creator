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
    purchaseableStatus: true,
  };
  purchaseCheckStatus(ingredients) {
    let updateStatus = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((ass, curr) => {
        return ass + curr;
      }, 0);
    this.setState({
      purchaseableStatus: updateStatus <= 0,
    });
    console.log(updateStatus);
    console.log(this.state.purchaseableStatus);
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updateIngredient = {
      ...this.state.ingredients,
    };
    updateIngredient[type] = newCount;
    const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
    this.setState({
      ingredients: updateIngredient,
      totalPrice: newTotalPrice,
    });
    this.purchaseCheckStatus(updateIngredient);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const oldIngredients = {
      ...this.state.ingredients,
    };

    if (oldIngredients[type] <= 0) {
      return;
    }

    oldIngredients[type] = oldCount - 1;
    const updatedTotal = this.state.totalPrice - INGREDIENT_PRICE[type];
    this.setState({
      ingredients: oldIngredients,
      totalPrice: updatedTotal,
    });
    this.purchaseCheckStatus(oldIngredients);
  };
  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (const key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BurgerContorls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={disableInfo}
          price={this.state.totalPrice}
          purchaseStatus={this.state.purchaseableStatus}
        />
      </Aux>
    );
  }
}

export default BugerBuilder;
