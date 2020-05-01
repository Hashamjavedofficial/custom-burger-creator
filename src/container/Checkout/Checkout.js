import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Redirect } from "react-router-dom";
import parseString from "query-string";

class Checkout extends React.Component {
  state = {
    ingredients: {
      bacon: 0,
      meat: 0,
      salad: 0,
      cheese: 0,
    },
    totalPrice: 0,
    error: false,
  };
  componentDidMount() {
    let temp = parseString.parse(this.props.location.search);
    const total = +temp.totalPrice;
    if (total.toFixed(2) > 0) {
      this.setState({
        ingredients: {
          bacon: +temp.bacon,
          meat: +temp.meat,
          salad: +temp.salad,
          cheese: +temp.cheese,
        },
        totalPrice: total.toFixed(2),
      });
    } else {
      this.props.history.goBack();
    }

    console.log(temp);
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
    this.props.history.replace("/check-out/order");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancel={this.cancelHandler}
          continue={this.continueHandler}
        />
      </div>
    );
  }
}

export default Checkout;
