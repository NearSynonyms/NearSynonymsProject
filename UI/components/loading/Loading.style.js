import { StyleSheet } from "react-native";
export const s = StyleSheet.create({
  img_background: {
    flex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.9,
  },
  logoView: {
    marginBottom: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 50,
  },
  loadingText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    bottom: 130,
    alignSelf: "center",
  },
  homeLogo: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 90, // Half of the width/height to make it circular
  },
});
