import { StyleSheet } from "react-native";
export const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  circularFrame: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  buttonText: { color: "#fff", fontSize: 16 },
  editIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#8c60a1",
    borderRadius: 15,
    padding: 5,
  },
});
