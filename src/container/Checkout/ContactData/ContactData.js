import React, { useState } from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { updateObject, checkValidation } from "../../../helpers/utility";

const ContactData = (props) => {
  const [contactState, setContactState] = useState({
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your name",
        },
        value: "",
        validation: {
          required: true,
          minlength: 3,
          maxlength: 9,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter City",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      delivery: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest",
            },
            {
              value: "cheapest",
              displayValue: "Cheapest",
            },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    forButton: false,
  });

  const orderHandler = (event) => {
    let orderData = {};
    for (let orderElement in contactState.orderForm) {
      orderData[orderElement] = contactState.orderForm[orderElement].value;
    }
    const orderInfo = {
      ingredients: props.ingredients,
      totalPrice: props.price,
      orderData: orderData,
      userId: props.userId,
    };
    props.onOrder(orderInfo, props.idToken);
    event.preventDefault();
  };

  const inputChangeHandler = (event, identifier) => {
    let orderForm = updateObject(contactState.orderForm, {
      [identifier]: updateObject(contactState.orderForm[identifier], {
        value: event.target.value,
        touched: true,
        valid: checkValidation(
          event.target.value,
          contactState.orderForm[identifier].validation
        ),
      }),
    });

    // {
    //   ...this.state.orderForm,
    // };
    // let orderElement = {
    //   ...orderForm[identifier],
    // };
    // orderElement.value = event.target.value;
    // orderForm[identifier] = orderElement;
    // orderForm[identifier].touched = true;
    // orderForm[identifier].valid = this.checkValidation(
    //   orderElement.value,
    //   orderForm[identifier].validation
    // );
    let forButton = true;
    for (let key in orderForm) {
      forButton = orderForm[key].valid && forButton;
    }
    setContactState({
      orderForm: orderForm,
      forButton: forButton,
    });
  };
  const formElementArray = [];
  for (let key in contactState.orderForm) {
    formElementArray.push({
      id: key,
      config: contactState.orderForm[key],
    });
  }
  const inputForm = formElementArray.map((formElement) => (
    <Input
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      key={formElement.id}
      value={formElement.config.value}
      changed={(event) => inputChangeHandler(event, formElement.id)}
      invalid={!formElement.config.valid}
      validations={formElement.config.validation}
      touched={formElement.config.touched}
    />
  ));

  let form = (
    <form>
      {inputForm}

      <Button
        btnType="Success"
        disabled={!contactState.forButton}
        clicked={orderHandler}
      >
        Order
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Order Form here</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    idToken: state.auth.idToken,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onOrder: (orderData, idToken) =>
      dispatch(actions.orderInfo(orderData, idToken)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
