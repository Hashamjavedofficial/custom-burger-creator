import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BurgerContorls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions/actionsTypes";
import * as burgerBuilder from "../../store/actions/index";

class BugerBuilder extends Component {
  state = {
    purchasing: false,
  };
  componentDidMount() {
    this.props.onSetIngredients();
    console.log("componentDidMount form Brrger Builder");
  }
  purchaseCheckStatus = (ingredients) => {
    let updateStatus = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((ass, curr) => {
        return ass + curr;
      }, 0);
    console.log(updateStatus);
    return updateStatus <= 0;
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
    // this.setState({
    //   loading: true,
    // });
    // let queryParams = `?bacon=${this.state.ingredients.bacon}&salad=${this.state.ingredients.salad}&meat=${this.state.ingredients.meat}&cheese=${this.state.ingredients.cheese}&totalPrice=${this.state.totalPrice}`;
    let query = [];
    for (let i in this.props.ingredients) {
      query.push(encodeURI(i) + "=" + encodeURI(this.props.ingredients[i]));
    }
    let queryReq = query.join("&");
    this.props.history.push({
      pathname: this.props.location.pathname + "checkout",
      search: "?" + queryReq + `&totalPrice=${this.props.totalPrice}`,
    });
  };
  render() {
    const disableInfo = {
      ...this.props.ingredients,
    };
    for (const key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Cannot load ingredients </p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BurgerContorls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabledInfo={disableInfo}
            price={this.props.totalPrice}
            purchaseStatus={this.purchaseCheckStatus(this.props.ingredients)}
            purchasing={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredient={this.props.ingredients}
          continue={this.continueHandler}
          cancel={this.cancelHandler}
          price={this.props.totalPrice}
        />
      );
    }
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} canceled={this.cancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientName) =>
      dispatch(burgerBuilder.addIngredient(ingredientName)),
    onRemoveIngredient: (ingredientName) =>
      dispatch(burgerBuilder.removeIngredient(ingredientName)),
    onSetIngredients: () => dispatch(burgerBuilder.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BugerBuilder, axios));
