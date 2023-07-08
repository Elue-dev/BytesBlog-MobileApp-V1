import { StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";
import { globalStyles } from "../../common/globalStyles";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#DEDEDE",
  },
  wrapper: {
    ...globalStyles.flexBetween,
    paddingHorizontal: 10,
    paddingBottom: 5,
    gap: 50,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.gray600,
    textAlign: "center",
  },
});
