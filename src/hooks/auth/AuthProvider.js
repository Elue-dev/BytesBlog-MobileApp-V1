import { createContext, useContext, useReducer } from "react";
import { RegistrationReducer } from "./RegistrationReducer";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(RegistrationReducer, {
    passwordVisible: false,
    cpasswordVisible: false,
    numberCondition: false,
    charCondition: false,
    lengthCondition: false,
    caseCondition: false,
    isLoading: false,
    passwordEntered: false,
    passwordCheckPassed: false,
  });

  const values = {
    state,
    dispatch,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
