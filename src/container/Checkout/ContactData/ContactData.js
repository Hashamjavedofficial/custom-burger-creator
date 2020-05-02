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
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter City",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Country",
        },
        value: "",
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter email",
        },
        value: "",
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
  orderHandler = (event) => {
    this.setState({
      loading: true,
    });
    const orderInfo = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      customer: {
        name: "Hasham",
        address: {
          street: "Bastami road",
          city: "lahore",
          country: "Pakistan",
        },
        email: "hasham.hasham1@gmail.com",
      },
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
    console.log(this.props);
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
