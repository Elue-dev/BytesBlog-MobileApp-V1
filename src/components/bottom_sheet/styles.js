import { StyleSheet } from "react-native";
import { globalStyles } from "../../common/globalStyles";

export const styles = StyleSheet.create({
  bottomSheetWrap: {
    padding: 15,
    zIndex: 20,
  },
  bottomSheetItem: {
    ...globalStyles.flexStart,
    gap: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#dbdbdb",
    paddingBottom: 20,
  },
  sheetText: {
    fontSize: 18,
  },
  switch: {
    transform: [{ scale: 0.9 }],
  },
});
