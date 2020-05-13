import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import parseString from "query-string";

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
      summary = (
        <React.Fragment>
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
  };
};
export default connect(mapStateToProps)(Checkout);
