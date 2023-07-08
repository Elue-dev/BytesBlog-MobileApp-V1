import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";

export const styles = StyleSheet.create({
  border: {
    borderTopWidth: 1,
    borderColor: COLORS.lightGraySec,
  },
  noComments: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noCommentsHeadingText: {
    fontSize: 24,
    fontWeight: 700,
    paddingTop: 10,
  },
  noCommentsSubText: {
    paddingTop: 10,
    fontSize: 16,
  },
  addCommentwrap: {
    paddingHorizontal: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  adjustedHeight: {
    marginBottom: Platform.OS === "ios" ? 350 : 20,
  },
  input: {
    flex: 2,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  greenText: {
    color: COLORS.primaryColor,
    fontWeight: 700,
    fontSize: 17,
  },
  disabledtext: {
    color: COLORS.grayNeutralSec,
    fontWeight: 600,
    fontSize: 17,
  },
  commentsWrap: {
    paddingTop: 10,
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
  },
  replyingTo: {
    paddingVertical: 2,
    color: COLORS.grayNeutral,
    textAlign: "center",
  },
});
