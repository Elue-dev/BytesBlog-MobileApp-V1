import { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthReducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE_USER":
      return { ...state, user: action.payload };
    case "REMOVE_ACTIVE_USER":
      return { ...state, user: null };
    default:
      return state;
  }
}

async function loadUserFromStorage(dispatch) {
  try {
    const storedUser = await AsyncStorage.getItem("user");
    const user = JSON.parse(storedUser);
    dispatch({ type: "SET_ACTIVE_USER", payload: user });
  } catch (error) {
    console.error("Error loading user from storage:", error);
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });

  useEffect(() => {
    loadUserFromStorage(dispatch);
  }, []);

  async function setActiveUser(user) {
    try {
      dispatch({ type: "SET_ACTIVE_USER", payload: user });
      await AsyncStorage.removeItem("user");
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Error setting active user:", error);
    }
  }

  function logOutUser() {
    dispatch({ type: "REMOVE_ACTIVE_USER" });
    AsyncStorage.removeItem("user");
  }

  const values = {
    state,
    dispatch,
    setActiveUser,
    logOutUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
