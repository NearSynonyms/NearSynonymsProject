import { StyleSheet } from "react-native";
export const s = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    left: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "red",
  },
  content: {
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    marginBottom: 20,
    height: 300,
    width: 200,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  prevButton: {
    padding: 10,
    backgroundColor: "#8c60a1",
    borderRadius: 5,
    marginRight: 5,
    width: 70,
  },
  nextButton: {
    padding: 10,
    backgroundColor: "#8c60a1",
    borderRadius: 5,
    marginLeft: 5,
    width: 70,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#8c60a1",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  contentView: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: "white",
  },
});
