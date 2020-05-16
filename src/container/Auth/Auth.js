import React, { Component } from "react";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter your password",
        },
        value: "",
        validation: {
          required: true,
          minlength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    signUp: true,
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
  inputChangeHandler = (event, identifier) => {
    let orderForm = {
      ...this.state.controls,
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
    this.setState({
      controls: orderForm,
    });
  };
  onFormSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.signUp
    );
  };
  authSwitchHandler = () => {
    this.setState((prevState) => {
      return {
        signUp: !prevState.signUp,
      };
    });
  };
  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let inputForm = formElementArray.map((formElement) => (
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
    if (this.props.loading) {
      inputForm = <Spinner />;
    }
    const heading = this.props.error ? this.props.error : "Login Form";
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.onFormSubmitHandler}>
          <h4>{heading}</h4>
          {inputForm}
          <Button btnType={"Success"}>Submit</Button>
        </form>
        <Button btnType={"Danger"} clicked={this.authSwitchHandler}>
          Switch to {this.state.signUp ? "SignIn" : "SignUp"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, method) =>
      dispatch(actions.auth(email, password, method)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
