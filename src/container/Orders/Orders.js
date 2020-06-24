import React, { useEffect } from "react";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
const Orders = (props) => {
  useEffect(() => {
    props.getOrders(props.idToken, props.userId);
  }, []);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map((key) => {
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
};
const mapStateToProps = (state) => {
  return {
    orders: state.order.order,
    loading: state.order.loading,
    idToken: state.auth.idToken,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (idToken, userId) => dispatch(actions.orderGet(idToken, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
