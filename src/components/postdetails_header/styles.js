import { StyleSheet } from "react-native";
import { globalStyles } from "../../common/globalStyles";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: "#fff",
  },
  wrapper: {
    ...globalStyles.flexBetween,
    paddingHorizontal: 10,
  },
});
