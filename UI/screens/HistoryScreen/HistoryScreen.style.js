import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const s = StyleSheet.create({
  img_background: {
    flex: 1,
    resizeMode: "cover",
  },
  scrollViewContent: {
    padding: 20,
  },
  backButton: {
    position: "absolute",
    left: 15,
  },
  card: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    width: width - 40,
    alignSelf: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 16,
    color: "#ffffff",
  },
  time: {
    fontSize: 16,
    color: "#ffffff",
  },
  cardBody: {
    flexDirection: "row",
    marginTop: 20,
  },
  levelContainer: {
    flexDirection: "column",
  },
  levelImage: {
    width: 50,
    height: 30,
    resizeMode: "contain",
    marginHorizontal: 10,
  },
  difficulty: {
    fontSize: 18,
    color: "#ffffff",
    marginLeft: 10,
  },
  correctAnswers: {
    fontSize: 18,
    color: "#ffffff",
    marginLeft: "auto",
  },
  viewProgressButton: {
    width: "50%",
    backgroundColor: "#6A0DAD",
    borderRadius: 20,
    padding: 15,
    marginVertical: 20,
    alignItems: "center",
    alignSelf: "center",
  },
  viewProgressButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
