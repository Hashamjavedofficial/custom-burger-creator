import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Checkout = (props) => {
  const cancelHandler = () => {
    props.history.goBack();
  };
  const continueHandler = () => {
    props.history.push(props.match.url + "/contact-data");
  };

  let summary = <Redirect to={"/"} />;
  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to={"/"} /> : null;
    summary = (
      <React.Fragment>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ingredients}
          cancel={cancelHandler}
          continue={continueHandler}
        />
        <Route
          path={props.match.url + "/contact-data"}
          component={ContactData}
        />
      </React.Fragment>
    );
  }
  return summary;
};
const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
