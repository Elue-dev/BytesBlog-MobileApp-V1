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
    gap: 2,
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
    marginBottom: 10,
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
  resultsCount: {
    textAlign: "center",
    fontSize: 17,
    marginHorizontal: 10,
    color: COLORS.primaryColorHover,
    fontWeight: 500,
    fontStyle: "italic",
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
  resultsWrap: {
    borderBottomWidth: 1,
    borderColor: COLORS.lightGraySec,
  },
  searchResults: {
    paddingTop: 20,
  },
  container: {
    maxWidth: "70%",
    marginBottom: 20,
    marginTop: 10,
  },
  contentWrap: {
    ...globalStyles.flexStart,
    gap: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
    backgroundColor: COLORS.primaryColorLight,
  },
  title: {
    fontWeight: "700",
  },
  content: {
    ...globalStyles.flexBetween,
    marginTop: 10,
  },
});
