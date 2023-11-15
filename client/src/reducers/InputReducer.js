

export const initialValue = {
  value: "",
  isValid: false,
  isTouched: false,
};

const output = (value, isValid, isTouched) => {
  return {
    value,
    isValid,
    isTouched,
  };
};

export const inputReducer = (prevState, action) => {
    if (action.type === "USER_INPUT") {
        return output(action.state.value, action.state.isValid, true);
    } else if (action.type === "INPUT_BLUR") {
        return output(prevState.value, prevState.isValid, true);
    } else {
        return initialValue;
    }
};