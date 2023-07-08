import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";

export const styles = StyleSheet.create({
  commentsWrap: {
    paddingTop: 15,
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  commentsContent: {
    flexDirection: "row",
    gap: 10,
  },
  commentInfoWrap: {
    // paddingBottom: 50,
  },
  topSec: {
    flexDirection: "row",
    gap: 5,
  },
  authorNames: {
    fontSize: 14,
  },
  comment: {
    paddingTop: 6,
    fontSize: 16,
    paddingRight: 40,
    lineHeight: 22,
  },
  actions: {
    flexDirection: "row",
    gap: 15,
  },
  repliesWrap: {
    marginLeft: 5,
    borderLeftWidth: 1,
    borderColor: COLORS.lightGraySec,
  },
  repliesText: {
    marginTop: 5,
    color: COLORS.grayNeutral,
  },
});
