import React, { Component } from "react";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import { updateObject } from "../../helpers/utility";
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
  componentDidMount() {
    if (!this.props.burgerBuilding && this.props.path !== "/") {
      this.props.onSetRedirect();
    }
  }

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
    let orderForm = updateObject(this.state.controls, {
      [identifier]: updateObject(this.state.controls[identifier], {
        touched: true,
        value: event.target.value,
        valid: this.checkValidation(
          event.target.value,
          this.state.controls[identifier].validation
        ),
      }),
    });
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
    const redirect = this.props.isAuth ? (
      <Redirect to={this.props.path} />
    ) : null;
    return (
      <div className={classes.Auth}>
        {redirect}
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
    isAuth: state.auth.idToken !== null,
    burgerBuilding: state.burgerBuilder.burger,
    path: state.auth.path,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, method) =>
      dispatch(actions.auth(email, password, method)),
    onSetRedirect: () => dispatch(actions.authRedirectPath("/")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
