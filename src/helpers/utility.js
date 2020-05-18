export const updateObject = (state, updatedProperties) => {
  return {
    ...state,
    ...updatedProperties,
  };
};
export const checkValidation = (value, rules) => {
  let validator = true;
  if (rules.required) {
    validator = value.trim() !== "" && validator;
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
};
