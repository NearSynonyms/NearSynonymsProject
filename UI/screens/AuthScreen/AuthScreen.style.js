import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  safe_area_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img_background: {
    flex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.9,
  },
  container: {
    paddingHorizontal: 20,
    height: "50%",
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    backgroundColor: "white",
  },
  welcome: {
    marginBottom: 30,
  },
  viewBtn: {
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "cover",
    marginTop: 10,
    marginBottom: 20,
  },
});
