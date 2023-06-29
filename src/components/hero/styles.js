import { StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";

export const styles = StyleSheet.create({
  bgImage: {
    height: 550,
    width: 400,
    resizeMode: "cover",
    position: "relative",
  },
  heroTextWrap: {
    position: "absolute",
    marginVertical: 50,
    padding: 10,
  },
  heroText: {
    fontSize: 42,
    maxWidth: 330,
    fontWeight: "500",
  },
  heroTextSec: {
    color: COLORS.grayNeutral,
    lineHeight: 25,
    paddingTop: 15,
    fontSize: 20,
    maxWidth: 330,
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
});
