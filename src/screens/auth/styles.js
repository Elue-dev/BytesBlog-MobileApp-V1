import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },
  welcomeText: {
    fontSize: 30,
    marginTop: 10,
  },
  oAuth: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 9,
    borderWidth: 1,
    borderColor: "#999",
    paddingVertical: 6,
    paddingHorizontal: Platform.OS === "android" ? 70 : 75,
    borderRadius: 6,
  },
  oAuthImage: {
    height: 35,
  },
  oAuthText: {
    fontSize: 18,
  },
  or: {
    marginVertical: 20,
    fontSize: 18,
  },
  formFields: {
    marginTop: 20,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "#999",
    width: 380,
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
    width: 350,
    height: 50,
    position: "relative",
    borderRadius: 5,
    fontSize: 17,
    paddingLeft: 10,
    color: "#555",
  },
  formText: {
    position: "absolute",
    top: -15,
    left: 15,
    fontSize: 18,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
  passwordInput: {
    marginTop: 45,
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
    fontSize: 20,
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
});
