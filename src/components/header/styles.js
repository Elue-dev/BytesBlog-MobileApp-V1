import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "#fff",
  },
  borders: {
    borderBottomWidth: 2,
    borderBottomColor: "rgb(242, 242, 242)",
  },
  authBtnWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
  },
  signInText: {
    color: COLORS.primaryColor,
    fontWeight: "700",
    fontSize: 18,
  },
  authBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 52,
    paddingHorizontal: 11,
    paddingVertical: 14,
    marginBottom: 10,
  },
  signUpBtn: {
    backgroundColor: COLORS.primaryColor,
  },
  signInBtn: {
    backgroundColor: "transparent",
  },
  signUpText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});
