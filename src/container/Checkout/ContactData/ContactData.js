import React, { Component } from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class ContactData extends Component {
  state = {
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
  };
  checkValidation(value, rules) {
    let validator = true;
    if (rules.required) {
      validator = value.trim() != "" && validator;
    }
    if (value.length < rules.minlength && validator) {
      validator = false;
      console.log("min length " + value.length);
    }
    if (value.length > rules.maxlength && validator) {
      validator = false;
      console.log("max length " + value.length);
    }
    return validator;
  }

  orderHandler = (event) => {
    let orderData = {};
    for (let orderElement in this.state.orderForm) {
      orderData[orderElement] = this.state.orderForm[orderElement].value;
    }
    const orderInfo = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      orderData: orderData,
    };
    this.props.onOrder(orderInfo);
    event.preventDefault();
  };

  inputChangeHandler = (event, identifier) => {
    let orderForm = {
      ...this.state.orderForm,
    };
    let orderElement = {
      ...orderForm[identifier],
    };
    orderElement.value = event.target.value;
    orderForm[identifier] = orderElement;
    orderForm[identifier].touched = true;
    orderForm[identifier].valid = this.checkValidation(
      orderElement.value,
      orderForm[identifier].validation
    );
    let forButton = true;
    for (let key in orderForm) {
      forButton = orderForm[key].valid && forButton;
    }

    console.log(forButton);
    this.setState({
      orderForm: orderForm,
      forButton: forButton,
    });
  };
  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    const inputForm = formElementArray.map((formElement) => (
      <Input
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        key={formElement.id}
        value={formElement.config.value}
        changed={(event) => this.inputChangeHandler(event, formElement.id)}
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
          disabled={!this.state.forButton}
          clicked={this.orderHandler}
        >
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Order Form here</h4>

        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onOrder: (orderData) => dispatch(actions.orderInfo(orderData)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
