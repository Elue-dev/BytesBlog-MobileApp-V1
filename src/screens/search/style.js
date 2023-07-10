import { StyleSheet, Platform } from "react-native";
import { COLORS } from "../../common/colors";
import { globalStyles } from "../../common/globalStyles";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputWrap: {
    marginTop: 30,
    ...globalStyles.flexStart,
    gap: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1.5,
    borderColor: COLORS.grayNeutral,
    height: 50,
    flex: 1,
    borderRadius: 10,
    marginRight: "auto",
    paddingLeft: 10,
    fontSize: 17,
  },
  iconContainer: {},
  icon: {
    color: COLORS.grayNeutral,
  },
  noResultsCont: {
    ...globalStyles.flexCenter,
    flexDirection: "column",
  },
  noResultsText: {
    fontSize: 25,
    marginTop: 20,
    fontWeight: 600,
  },
  noResultsSubText: {
    fontSize: 17,
  },
  noResultsImg: {
    height: 200,
    width: 200,
    marginTop: 50,
  },
  introSearch: {
    ...globalStyles.flexCenter,
    flexDirection: "column",
    paddingTop: 100,
    color: COLORS.grayNeutral,
  },
  introText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 19,
  },
  searchResults: {
    paddingTop: 20,
  },
  container: {
    maxWidth: "70%",
    marginBottom: 20,
    marginLeft: 10,
  },
  contentWrap: {
    ...globalStyles.flexStart,

    gap: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  title: {
    fontWeight: "700",
  },
  info: {
    ...globalStyles.flexBetween,
    justifyContent: "flex-end", // Align children to the bottom
    marginTop: 20,
  },
  readTime: {
    ...globalStyles.flexStart,
    gap: 1,
  },
  createdAt: {
    ...globalStyles.flexStart,
    gap: 4,
    marginLeft: "auto", // Push component to the right
  },
});
