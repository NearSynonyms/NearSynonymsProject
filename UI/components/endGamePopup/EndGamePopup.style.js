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
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: "white",
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  btn: {
    padding: 10,
    backgroundColor: "#8c60a1",
    borderRadius: 5,
    height: 40,
    width: 100,
    alignItems: "center",
    margin: 20,
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
  header: {
    width: "100%",
    backgroundColor: "#8c60a1",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  viewInfo: {
    padding: 20,
    alignItems: "center",
  },
  btnView: {
    flexDirection: "row",
    alignItems: "center",
  },
});
