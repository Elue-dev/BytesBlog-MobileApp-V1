import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  backIcon: {
    marginLeft: 10,
    marginBottom: 30,
    color: "#555",
    marginTop: 120,
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },
  imageWrapperReset: {
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 30,
    marginTop: 10,
  },
  oAuth: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    borderWidth: 1,
    borderColor: "#999",
    minWidth: Platform.OS === "android" ? "92%" : "95%",
    height: 50,
    borderRadius: 6,
  },
  oAuthImage: {
    height: 35,
  },
  oAuthText: {
    fontSize: 18,
  },
  or: {
    marginVertical: 10,
    fontSize: 18,
    textAlign: "center",
  },
  formFields: {
    marginTop: 20,
    marginBottom: 100,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "#999",
    minWidth: "92%",
    height: 54,
    position: "relative",
    borderRadius: 5,
    fontSize: 17,
    paddingLeft: 10,
    color: "#555",
  },
  inputIOS: {
    borderWidth: 1,
    borderColor: "#999",
    minWidth: "95%",
    height: 50,
    position: "relative",
    borderRadius: 5,
    fontSize: 17,
    color: "#555",
    paddingLeft: 10,
  },
  formText: {
    position: "absolute",
    top: Platform.OS === "android" ? -14 : -10,
    left: 15,
    fontSize: 18,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
  spaceOut: {
    marginTop: 28,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 13,
  },

  forgotPasswordText: {
    textAlign: "right",
    fontSize: 16,
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#169639",
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 30,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: 600,
  },
  redirect: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 3,
  },
  redirectText: {
    fontSize: 16,
  },
  underline: {
    textDecorationLine: "underline",
    fontWeight: 700,
  },
  errorText: {
    color: "crimson",
    fontWeight: "700",
    marginTop: 7,
    fontSize: 14,
  },
  checkItem: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  checkText: {
    color: "crimson",
    paddingVertical: 5,
    fontWeight: 600,
  },
  checkItemPassed: {
    color: COLORS.primaryColorHover,
    fontWeight: 700,
    paddingVertical: 5,
  },
  subText: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.blackNeutralSec,
    marginBottom: 40,
    marginTop: 5,
  },
});
