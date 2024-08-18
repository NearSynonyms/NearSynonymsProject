import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    height: 10, // Height of the timer line
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Background color for the empty timer
    overflow: "hidden",
    borderRadius: 5,
    width: "90%", // Width of the full timer bar
    alignSelf: "center",
    marginTop: 15,
  },
  timerLine: {
    backgroundColor: "rgba(211,112,204,1)", // Background color for the empty timer
    height: "100%",
    borderRadius: 5,
  },
});
