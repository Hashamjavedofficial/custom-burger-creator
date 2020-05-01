import React, { Component } from "react";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios";
class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((response) => {
        let tempOrders = [];
        for (let i in response.data) {
          tempOrders.push({
            ...response.data[i],
            key: i,
          });
        }
        this.setState({
          orders: tempOrders,
          loading: false,
        });
        console.log(this.state.orders);
      })
      .catch((err) => {});
  }

  render() {
    let orders = this.state.orders.map((key) => {
      return (
        <Order
          key={key.key}
          ingredients={key.ingredients}
          totalPrice={key.totalPrice}
        />
      );
    });
    return <div>{orders}</div>;
  }
}
export default withErrorHandler(Orders, axios);
