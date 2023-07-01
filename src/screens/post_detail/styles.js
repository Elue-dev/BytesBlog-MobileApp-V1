import { StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";
import { globalStyles } from "../../common/globalStyles";

export const styles = StyleSheet.create({
  container: {
    ...globalStyles.absoluteSpacing,
    paddingTop: 20,
  },
  bgImage: {
    resizeMode: "contain",
    height: 100,
  },
  content: {
    marginLeft: 15,
  },
  icon: {
    color: COLORS.gray600,
  },
  authorInfo: {
    marginVertical: 30,
    ...globalStyles.flexBetween,
    paddingRight: 10,
  },
  authorImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  authorProfile: {
    ...globalStyles.flexStart,
    gap: 10,
  },
  authorNames: {
    fontSize: 20,
  },
  createdAt: {
    color: COLORS.grayNeutral,
  },
  readTime: {
    fontSize: 16,
    fontWeight: 400,
  },
  postContent: {
    marginTop: 10,
  },
  postTitle: {
    fontSize: 25,
    fontWeight: 700,
    marginBottom: 30,
  },
  postImg: {
    height: 200,
    width: "100%",
    resizeMode: "contain",
    borderRadius: 10,
  },
  postContent: {
    marginTop: 20,
    color: COLORS.grayNeutral,
    fontSize: 18,
    lineHeight: 30,
  },
});
