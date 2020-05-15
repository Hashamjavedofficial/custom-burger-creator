import React, { Component } from "react";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((key) => {
        return (
          <Order
            key={key.key}
            ingredients={key.ingredients}
            totalPrice={key.totalPrice}
          />
        );
      });
    }

    return <div>{orders}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.order.order,
    loading: state.order.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => dispatch(actions.orderGet()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
