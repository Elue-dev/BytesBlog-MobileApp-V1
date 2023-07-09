import { COLORS } from "./colors";

export const globalStyles = {
  absoluteSpacing: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "#fff",
    paddingBottom: 50,
  },
  flexStart: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  flexBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexCol: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flexCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 52,
    paddingHorizontal: 11,
    paddingVertical: 14,
    marginBottom: 10,
    marginTop: 20,
    width: "50%",
  },
  avatarStyle: {
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: COLORS.primaryColorLight,
  },
};
