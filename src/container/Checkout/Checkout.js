import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
import parseString from "query-string";

class Checkout extends React.Component {
  state = {
    ingredients: null,
    totalPrice: null,
  };
  componentWillMount() {
    let temp = parseString.parse(this.props.location.search);
    let price = 0;
    let actualIngredients = {};
    for (let i in temp) {
      if (i == "totalPrice") {
        price = +temp[i];
      } else {
        actualIngredients[i] = +temp[i];
      }
    }
    this.setState({
      ingredients: actualIngredients,
      totalPrice: price,
    });
    console.log(this.props);
  }
  cancelHandler = () => {
    this.props.history.goBack();
  };
  continueHandler = () => {
    this.props.history.push(this.props.match.url + "/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancel={this.cancelHandler}
          continue={this.continueHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
