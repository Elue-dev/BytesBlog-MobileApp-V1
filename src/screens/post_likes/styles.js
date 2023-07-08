import { StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";
import { globalStyles } from "../../common/globalStyles";

export const styles = StyleSheet.create({
  noLikes: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noLikesHeadingText: {
    fontSize: 24,
    fontWeight: 700,
    paddingTop: 10,
  },
  noLikesSubText: {
    paddingTop: 10,
    fontSize: 16,
  },
  wrapper: {
    ...globalStyles.flexBetween,
    paddingVertical: 14,
  },
  likesWrap: {
    ...globalStyles.flexStart,
    gap: 10,
    justifyContent: "space-between",
  },
  userImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  topWrap: {
    ...globalStyles.flexBetween,
  },
  text: {
    fontSize: 17,
    fontWeight: 500,
  },
  bio: {
    fontSize: 17,
    color: COLORS.grayNeutral,
  },
  btn: {
    backgroundColor: "transparent",
    borderWidth: 1.2,
    borderColor: COLORS.primaryColorHover,
    padding: 10,
    borderRadius: 50,
  },
  btnText: {
    color: COLORS.primaryColor,
    fontWeight: 600,
    fontSize: 15,
  },
});
