import React, { useState, useEffect } from "react";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidation } from "../../helpers/utility";
const Auth = (props) => {
  const [controls, setControls] = useState({
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
  });
  const [signUp, setSignUp] = useState(true);
  const { burgerBuilding, path, onSetRedirect } = props;
  useEffect(() => {
    if (!burgerBuilding && path !== "/") {
      onSetRedirect();
    }
  }, [burgerBuilding, path, onSetRedirect]);

  const inputChangeHandler = (event, identifier) => {
    let orderForm = updateObject(controls, {
      [identifier]: updateObject(controls[identifier], {
        touched: true,
        value: event.target.value,
        valid: checkValidation(
          event.target.value,
          controls[identifier].validation
        ),
      }),
    });
    setControls(orderForm);
  };
  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, signUp);
  };
  const authSwitchHandler = () => {
    setSignUp(!signUp);
  };

  const formElementArray = [];
  for (let key in controls) {
    formElementArray.push({
      id: key,
      config: controls[key],
    });
  }
  let inputForm = formElementArray.map((formElement) => (
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
  if (props.loading) {
    inputForm = <Spinner />;
  }
  const heading = props.error ? props.error : "Login Form";
  const redirect = props.isAuth ? <Redirect to={props.path} /> : null;
  return (
    <div className={classes.Auth}>
      {redirect}
      <form onSubmit={onFormSubmitHandler}>
        <h4>{heading}</h4>
        {inputForm}
        <Button btnType={"Success"}>Submit</Button>
      </form>
      <Button btnType={"Danger"} clicked={authSwitchHandler}>
        Switch to {signUp ? "SignIn" : "SignUp"}
      </Button>
    </div>
  );
};

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
