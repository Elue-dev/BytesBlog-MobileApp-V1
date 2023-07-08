import { StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";
import { globalStyles } from "../../common/globalStyles";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  topSec: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryColorLight,
  },
  names: {
    fontSize: 30,
    fontWeight: 500,
    marginVertical: 10,
  },
  bio: {
    fontSize: 20,
    paddingBottom: 10,
    color: "#888",
  },
  info: {
    paddingTop: 20,
  },
  headingText: {
    fontSize: 17,
    fontWeight: 700,
    color: "#999",
  },
  flexInfo: {
    ...globalStyles.flexBetween,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGraySec,
    paddingTop: 10,
  },
  title: {
    fontWeight: 600,
    fontSize: 15,
    color: COLORS.primaryColorHover,
  },
  infoText: {
    fontSize: 15,
  },
  interests: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingTop: 20,
  },
  interestsFlex: {
    ...globalStyles.flexBetween,
    paddingTop: 30,
  },
  interest: {
    borderWidth: 1.5,
    borderColor: COLORS.primaryColorHover,
    backgroundColor: COLORS.primaryColorLight,
    padding: 10,
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
  },
  manage: {
    ...globalStyles.flexStart,
    gap: 5,
  },
  manageText: {
    fontSize: 15,
    color: COLORS.gray600,
  },
});
