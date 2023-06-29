import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "#fff",
    paddingBottom: 50,
  },
  wrapper: {
    paddingVertical: 60,
    gap: 10,
  },
  offers: {
    marginVertical: 20,
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 600,
    marginTop: 45,
    marginBottom: 25,
  },
  offersWrap: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    maxWidth: 320,
  },
  offersHeading: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 6,
  },
  subText: {
    color: COLORS.grayNeutral,
    fontSize: 16,
    lineHeight: 25,
  },
  offersImg: {
    height: 50,
    width: 50,
    resizeMode: "cover",
  },
  offersContent: {
    paddingTop: 20,
  },
  landingBottom: {
    paddingTop: 30,
  },
  flexImg: {
    justifyContent: "center",
    alignItems: "center",
  },
  landingImg: {
    width: Platform.OS === "android" ? 380 : 350,
    borderRadius: 40,
    marginHorizontal: 10,
  },
  btn: {
    backgroundColor: COLORS.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 52,
    width: 130,
    height: 60,
    marginTop: 20,
  },
  gerStarted: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 600,
  },
  footer: {
    height: 300,
    paddingTop: 30,
  },
});