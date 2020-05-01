import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
class Checkout extends React.Component {
  state = {
    ingredients: {
      cheese: 1,
      salad: 1,
      bacon: 1,
      meat: 1,
    },
  };
  cancelHandler = () => {
    console.log(this.props);
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancel={this.cancelHandler}
        />
      </div>
    );
  }
}

export default Checkout;
