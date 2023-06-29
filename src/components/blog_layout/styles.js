import { StyleSheet } from "react-native";

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
});
