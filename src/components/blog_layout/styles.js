import { StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";
import { globalStyles } from "../../common/globalStyles";

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    paddingTop: 30,
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 50,
  },
  image: {
    width: "95%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 4,
  },
  topContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  authorDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
    paddingTop: 10,
  },
  username: {
    fontWeight: 500,
    fontSize: 16,
  },
  categorySelectionText: {
    textAlign: "center",
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 17,
    fontWeight: 600,
    borderBottomWidth: 2,
    borderColor: "#dedede",
  },
  categorySelectionSubText: {
    fontStyle: "italic",
    color: COLORS.primaryColor,
    fontWeight: 700,
  },
  readTime: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 3,
    paddingTop: 5,
  },
  readTimeText: {
    color: "#718096",
  },
  date: {
    color: "#718096",
  },
  main: {
    marginRight: 15,
  },
  title: {
    fontWeight: 700,
    fontSize: 28,
    paddingTop: 20,
  },
  content: {
    color: "#767D8D",
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 8,
    lineHeight: 25,
  },
  readMore: {
    color: "#169639",
    fontWeight: 700,
    fontSize: 17,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 15,
    paddingTop: 20,
  },
  statsContent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  authBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 52,
    paddingHorizontal: 11,
    paddingVertical: 14,
    marginBottom: 10,
    marginTop: 20,
    width: "50%",
  },
  signUpBtn: {
    backgroundColor: COLORS.primaryColor,
  },
  noResults: {
    color: COLORS.blackNeutralSec,
    fontSize: 18,
    marginVertical: 15,
    lineHeight: 27,
  },
  manageIntWrap: {
    ...globalStyles.flexCol,
  },
  manageInt: {
    ...globalStyles.btn,
    backgroundColor: COLORS.primaryColorLighter,
  },
  btnText: {
    color: COLORS.primaryColor,
    fontWeight: 700,
    fontSize: 16,
  },
});
