import { StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";

export const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 80,
    backgroundColor: "#fff",
    flex: 1,
  },
  icon: {
    marginLeft: 10,
    marginBottom: 30,
    color: "#555",
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 700,
  },
  subText: {
    textAlign: "center",
    fontSize: 17,
    color: COLORS.blackNeutralSec,
    marginBottom: 40,
  },
  interestsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    padding: 8,
  },
  interestItem: {
    borderWidth: 1,
    borderRadius: 52,
    borderColor: COLORS.lighterGray,
    padding: 10,
    margin: 5,
  },
  intText: {
    fontSize: 18,
    color: COLORS.lighterGray,
  },
  active: {
    borderColor: COLORS.primaryColorHover,
    borderWidth: 2,
  },
  activeText: {
    color: COLORS.primaryColorHover,
    fontWeight: 700,
  },
  btn: {
    backgroundColor: "#169639",
    paddingVertical: 16,
    borderRadius: 5,
    marginVertical: 30,
    marginHorizontal: 10,
    width: "95%",
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
    fontWeight: 600,
  },
});
