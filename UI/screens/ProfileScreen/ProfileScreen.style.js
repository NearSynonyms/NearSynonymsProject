import { StyleSheet, Dimensions } from "react-native";
const { height: screenHeight } = Dimensions.get("window");

const contentHeight = screenHeight * 0.7;
export const s = StyleSheet.create({
  content: {
    position: "absolute",
    bottom: 0,
    height: contentHeight,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});
