import { StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";
import { globalStyles } from "../../common/globalStyles";

export const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 700,
    paddingTop: 50,
    paddingBottom: 10,
  },
  itemWrap: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGraySec,
  },
  postImg: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    marginTop: 15,
  },
  authorInfo: {
    ...globalStyles.flexStart,
    paddingTop: 10,
  },
  authorImage: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },
  authorName: {
    fontWeight: 700,
    color: COLORS.grayLight,
  },
  createdAt: {
    color: COLORS.primaryColorHover,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 700,
    paddingTop: 12,
  },
  postContent: {
    color: "#636366",
    paddingTop: 7,
    lineHeight: 22,
    fontSize: 16,
  },
  bottomSec: {
    ...globalStyles.flexBetween,
    paddingTop: 15,
  },
  readMoreWrap: {
    ...globalStyles.flexCenter,
    gap: 2,
    paddingBottom: 10,
  },
  readMore: {
    color: COLORS.primaryColorHover,
    fontSize: 17,
    fontWeight: 700,
  },
  readTime: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.blackNeutralSec,
  },
  readTimeWrap: {
    ...globalStyles.flexCenter,
    gap: 5,
    paddingBottom: 10,
  },
});
