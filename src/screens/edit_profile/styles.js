import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";
import { globalStyles } from "../../common/globalStyles";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,

    paddingHorizontal: 10,
  },
  headingText: {
    fontSize: 17,
    fontWeight: 700,
    color: COLORS.grayNeutral,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 15,
    backgroundColor: COLORS.primaryColorLight,
  },
  flexTop: {
    ...globalStyles.flexStart,
    gap: 10,
  },
  replaceText: {
    color: COLORS.primaryColorHover,
    fontSize: 17,
    fontWeight: 600,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  subText: {
    fontSize: 17,
    color: COLORS.grayNeutral,
  },
  namesSec: {
    paddingTop: 30,
  },
  flexInput: {
    ...globalStyles.flexStart,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: COLORS.grayLight,
    marginVertical: 15,
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  bioSec: {
    paddingTop: 40,
  },
  bioText: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 10,
  },
  bioInput: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    paddingVertical: Platform.OS === "ios" ? 100 : 50,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 20,
    fontSize: 16,
    color: "#333",
    lineHeight: 25,
  },
  bioLength: {
    textAlign: "right",
    color: COLORS.blackNeutralSec,
    fontSize: 16,
    paddingTop: 10,
  },
  btnFlex: {
    ...globalStyles.flexStart,
    paddingTop: 30,
    gap: 10,
    paddingBottom: 40,
  },
  btn: {
    flex: 1,
    padding: 15,
    borderRadius: 20,
  },
  cancelBtn: {
    backgroundColor: COLORS.primaryColorLighter,
  },
  saveBtn: {
    backgroundColor: COLORS.primaryColor,
  },
  btnText: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 17,
  },
  cancelBtnText: {
    color: COLORS.primaryColor,
  },
  saveBtnText: {
    color: "#fff",
  },
});
