import React, { Component } from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { withRouter } from "react-router-dom";
import { element } from "prop-types";

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
        value: "",
      },
    },
    loading: false,
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
    this.setState({
      loading: true,
    });
    let orderData = {};
    for (let orderElement in this.state.orderForm) {
      orderData[orderElement] = this.state.orderForm[orderElement].value;
    }
    const orderInfo = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      orderData: orderData,
    };
    axios
      .post("/orders.json", orderInfo)
      .then((response) => {
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
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
    orderForm[identifier].valid = this.checkValidation(
      orderElement.value,
      orderForm[identifier].validation
    );

    console.log(orderForm[identifier].valid);
    this.setState({
      orderForm: orderForm,
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
      />
    ));

    let form = (
      <form>
        {inputForm}

        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
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
export default ContactData;
