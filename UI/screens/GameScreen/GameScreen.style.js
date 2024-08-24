import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const s = StyleSheet.create({
  img_background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  appBar: {
    flex: 1.5,
    position: "relative",
  },
  topBarImg: {
    flex: 1,
    resizeMode: "stretch",
    width: "100%",
  },
  exitButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  topGradient: {
    height: 8,
  },
  questionSection: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  questionNumberView: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 30,
    borderTopWidth: 2,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  questionNumberTxt: {
    color: "white",
    fontSize: 23,
  },
  currentQuestionTxt: {
    color: "white",
    fontSize: 30,
  },
  question: {
    marginTop: 15,
    alignItems: "center",
  },
  questionTxt: {
    color: "white",
    textAlign: "center",
  },
  answerSection: {
    flex: 2.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonAnswer: {
    marginBottom: 50,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  buttonAnswerTxt: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
    color: "white",
  },
  bottomView: {
    flex: 0.8,
  },
  exitButton: {
    position: "absolute",
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 38,
    left: 30,
    bottom: 30,
  },
  exitIconView: {
    marginTop: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  exitGameIcon: {
    height: "75%",
    width: "75%",
    resizeMode: "contain",
  },
});
