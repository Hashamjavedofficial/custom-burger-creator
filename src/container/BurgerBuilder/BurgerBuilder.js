import React, { useState, useEffect, useCallback } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const BugerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const { onSetIngredients } = props;
  useEffect(() => {
    onSetIngredients();
  }, [onSetIngredients]);

  const purchaseCheckStatus = (ingredients) => {
    let updateStatus = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((ass, curr) => {
        return ass + curr;
      }, 0);

    return updateStatus <= 0;
  };
  const purchaseHandler = () => {
    if (props.isAuth) {
      setPurchasing(true);
    } else {
      props.onSetRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };
  const cancelHandler = () => {
    setPurchasing(false);
  };
  const continueHandler = () => {
    // this.setState({
    //   loading: true,
    // });
    // let queryParams = `?bacon=${this.state.ingredients.bacon}&salad=${this.state.ingredients.salad}&meat=${this.state.ingredients.meat}&cheese=${this.state.ingredients.cheese}&totalPrice=${this.state.totalPrice}`;
    let query = [];
    for (let i in props.ingredients) {
      query.push(encodeURI(i) + "=" + encodeURI(props.ingredients[i]));
    }
    let queryReq = query.join("&");
    props.history.push({
      pathname: props.location.pathname + "checkout",
      search: "?" + queryReq + `&totalPrice=${props.totalPrice}`,
    });
    props.onPurchasedInit();
  };

  const disableInfo = {
    ...props.ingredients,
  };
  for (const key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }
  let orderSummary = null;

  let burger = props.error ? <p>Cannot load ingredients </p> : <Spinner />;

  if (props.ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          ingredientAdded={props.onAddIngredient}
          ingredientRemoved={props.onRemoveIngredient}
          disabledInfo={disableInfo}
          price={props.totalPrice}
          isAuth={props.isAuth}
          purchaseStatus={purchaseCheckStatus(props.ingredients)}
          purchasing={purchaseHandler}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredient={props.ingredients}
        continue={continueHandler}
        cancel={cancelHandler}
        price={props.totalPrice}
      />
    );
  }
  return (
    <React.Fragment>
      <Modal show={purchasing} canceled={cancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.idToken !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientName) =>
      dispatch(actions.addIngredient(ingredientName)),
    onRemoveIngredient: (ingredientName) =>
      dispatch(actions.removeIngredient(ingredientName)),
    onSetIngredients: () => dispatch(actions.initIngredients()),
    onPurchasedInit: () => dispatch(actions.purchasedInit()),
    onSetRedirectPath: (path) => dispatch(actions.authRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BugerBuilder, axios));
