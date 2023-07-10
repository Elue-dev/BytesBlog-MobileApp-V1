import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";
import { globalStyles } from "../../common/globalStyles";

export const styles = StyleSheet.create({
  wrapper: {
    ...globalStyles.flexBetween,
    marginHorizontal: 10,
    backgroundColor: "#fff",
  },
  borders: {
    borderBottomWidth: 2,
    borderBottomColor: "rgb(242, 242, 242)",
  },
  profileSec: {
    ...globalStyles.flexStart,
    gap: 0,
  },
  avatar: {
    height: 55,
    width: 55,
    borderRadius: 27.5,
    resizeMode: "cover",
    backgroundColor: COLORS.primaryColorLight,
  },
  flexHead: {
    ...globalStyles.flexStart,
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
