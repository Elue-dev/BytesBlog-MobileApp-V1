export const RegistrationReducer = (state, action) => {
  switch (action.type) {
    case "PASSWORD_VISIBILITY_CHECKED":
      return {
        ...state,
        passwordVisible: !state.passwordVisible,
      };
    case "CPASSWORD_VISIBILITY_CHECKED":
      return {
        ...state,
        cpasswordVisible: !state.cpasswordVisible,
      };
    case "NUMBER_CONDITION_CHECKED":
      return {
        ...state,
        numberCondition: !state.numberCondition,
      };
    case "CHAR_CONDITION_CHECKED":
      return {
        ...state,
        charCondition: !state.charCondition,
      };
    case "LENGTH_CONDITION_CHECKED":
      return {
        ...state,
        lengthCondition: !state.lengthCondition,
      };
    case "CASE_CONDITION_CHECKED":
      return {
        ...state,
        caseCondition: !state.caseCondition,
      };
    case "HANDLE_LOADING":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case "PASSWORD_ENTERED":
      return {
        ...state,
        passwordEntered: true,
      };
    case "PASSWORD_CHECKS_PASSED":
      return {
        ...state,
        passwordCheckPassed: !state.passwordCheckPassed,
      };
    default:
      return state;
  }
};
