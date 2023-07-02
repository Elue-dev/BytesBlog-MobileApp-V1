export function AuthReducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE_USER":
      return { ...state, user: action.payload };
    case "REMOVE_ACTIVE_USER":
      return { ...state, user: null };
    case "TOGGLE_BOTTOM_SHEET":
      return { ...state, bottomSheetOpen: !state.bottomSheetOpen };
    case "TOGGLE_OVERLAY":
      return { ...state, isOverlayVisible: !state.isOverlayVisible };
    default:
      return state;
  }
}
