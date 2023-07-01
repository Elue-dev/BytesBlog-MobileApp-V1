export function AuthReducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE_USER":
      return { ...state, user: action.payload };
    case "REMOVE_ACTIVE_USER":
      return { ...state, user: null };
    default:
      return state;
  }
}
