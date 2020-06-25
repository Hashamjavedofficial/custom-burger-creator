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

  const dispatch = useDispatch();

  const onAddIngredient = (ingredientName) =>
    dispatch(actions.addIngredient(ingredientName));
  const onRemoveIngredient = (ingredientName) =>
    dispatch(actions.removeIngredient(ingredientName));
  const onSetIngredients = useCallback(() =>
    dispatch(actions.initIngredients())
  );
  const onPurchasedInit = () => dispatch(actions.purchasedInit());
  const onSetRedirectPath = (path) => dispatch(actions.authRedirectPath(path));

  const ingredients = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuth = useSelector((state) => state.auth.idToken !== null);

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
    if (isAuth) {
      setPurchasing(true);
    } else {
      onSetRedirectPath("/checkout");
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
    for (let i in ingredients) {
      query.push(encodeURI(i) + "=" + encodeURI(ingredients[i]));
    }
    let queryReq = query.join("&");
    props.history.push({
      pathname: props.location.pathname + "checkout",
      search: "?" + queryReq + `&totalPrice=${totalPrice}`,
    });
    onPurchasedInit();
  };

  const disableInfo = {
    ...ingredients,
  };
  for (const key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }
  let orderSummary = null;

  let burger = error ? <p>Cannot load ingredients </p> : <Spinner />;

  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={onAddIngredient}
          ingredientRemoved={onRemoveIngredient}
          disabledInfo={disableInfo}
          price={totalPrice}
          isAuth={isAuth}
          purchaseStatus={purchaseCheckStatus(ingredients)}
          purchasing={purchaseHandler}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredient={ingredients}
        continue={continueHandler}
        cancel={cancelHandler}
        price={totalPrice}
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

export default withErrorHandler(BugerBuilder, axios);
