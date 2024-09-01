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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#8c60a1",
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    left: 10,
  },
  profileContainer: {
    flexDirection: "column",
    padding: 20,
    justifyContent: "flex-start",
  },
  imageAndNameContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  imageContainer: {
    position: "relative",
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#8c60a1",
  },
  historyContainer: {
    alignItems: "center",
    flexDirection: "column",
  },
  historyBtn: {
    flexDirection: "row",
  },
  historyTxt: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#8c60a1",
  },
  historyIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    color: "#8c60a1",
    marginHorizontal: 10,
  },
  bottomLine: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    marginHorizontal: 20,
  },
  section: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonsText: {
    fontSize: 20,
    marginBottom: 5,
  },
  aboutUs: {
    marginBottom: 20,
  },
  fotter: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  saveTxt: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#8c60a1",
  },
  saveBtn: {
    marginTop: 30,
  },
});
