import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
import parseString from "query-string";

class Checkout extends React.Component {
  state = {
    ingredients: {
      bacon: 0,
      meat: 0,
      salad: 0,
      cheese: 0,
    },
  };

  componentDidMount() {
    let temp = parseString.parse(this.props.location.search);
    const total = +temp.totalPrice;
    let actualIngredients = {};
    for (let i in temp) {
      actualIngredients[i] = +temp[i];
    }
    this.setState({
      ingredients: actualIngredients,
    });
    console.log(this.props);

    // // console.log(this.props.location.state.ingredients);
    // // console.log(this.props.location.state.totalPrice);
    // this.setState({
    //   ingredients: this.props.location.state.ingredients,
    //   totalPrice: this.props.location.state.totalPrice,
    // });
    // if (!this.state.totalPrice) {
    //   console.log("hit if block");
    // } else {
    //   // this.setState({
    //   //   error: true,
    //   // });
    //   console.log("hit else");
    // }
  }
  componentWillUnmount() {
    console.log("Unmount in checkout hit");
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
          component={ContactData}
        />
      </div>
    );
  }
}

export default Checkout;
