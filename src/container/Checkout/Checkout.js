import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Checkout extends React.Component {
  cancelHandler = () => {
    this.props.history.goBack();
  };
  continueHandler = () => {
    this.props.history.push(this.props.match.url + "/contact-data");
  };
  render() {
    let summary = <Redirect to={"/"} />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to={"/"} />
      ) : null;
      summary = (
        <React.Fragment>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            cancel={this.cancelHandler}
            continue={this.continueHandler}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            component={ContactData}
          />
        </React.Fragment>
      );
    }
    return summary;
  }
}
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
