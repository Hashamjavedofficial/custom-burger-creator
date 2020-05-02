import React, { Component } from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { withRouter } from "react-router-dom";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
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
  render() {
    let form = (
      <form>
        <Input inputtype="input" type="text" placeholder="Name" />
        <Input inputtype="input" type="email" placeholder="Email" />
        <Input inputtype="input" type="text" placeholder="Street" />
        <Input inputtype="input" type="number" placeholder="Postal code" />
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
