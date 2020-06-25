import React from "react";
import Aux from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
import useHttpRequest from "../../hooks/http-handler";
const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, errorHandler] = useHttpRequest(axios);

    return (
      <Aux>
        <Modal show={error} canceled={errorHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};
export default withErrorHandler;
