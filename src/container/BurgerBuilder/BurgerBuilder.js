import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BurgerContorls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
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
    purchasing: false,
    loading: false,
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
  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };
  cancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  continueHandler = () => {
    this.setState({
      loading: true,
    });
    const orderInfo = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: "Hasham",
        address: {
          street: "Bastami road",
          city: "lahore",
          country: "Pakistan",
        },
        email: "hasham.hasham1@gmail.com",
      },
    };

    axios
      .post("/orders.jsn", orderInfo)
      .then((response) => {
        this.setState({
          loading: false,
          purchasing: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          purchasing: false,
        });
      });
  };
  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (const key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredient={this.state.ingredients}
        continue={this.continueHandler}
        cancel={this.cancelHandler}
        price={this.state.totalPrice}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} canceled={this.cancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BurgerContorls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={disableInfo}
          price={this.state.totalPrice}
          purchaseStatus={this.state.purchaseableStatus}
          purchasing={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default withErrorHandler(BugerBuilder, axios);
