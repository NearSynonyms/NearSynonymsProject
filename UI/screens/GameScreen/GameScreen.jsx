import { React, useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import Timer from "../../components/Timer/Timer";
import { Txt } from "../../components/Txt/Txt";
import { s } from "./GameScreen.style";
import { LinearGradient } from "expo-linear-gradient";
import EndGamePopup from "../../components/endGamePopup/EndGamePopup";
import Gameplay from "../../GameLogic/Gameplay";

export default function GameScreen({ route, navigation }) {
  const { backgroundImg, appBarImg, exitIcon, user } = route.params;
  const [gameplay, setGameplay] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState("");
  const [btn1Txt, setBtn1Txt] = useState("");
  const [btn2Txt, setBtn2Txt] = useState("");
  const [resetTimer, setResetTimer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [stopTimer, setStopTimer] = useState(false);

  const initializeGame = async () => {
    const game = new Gameplay(user);
    await game.init();
    setGameplay(game);
    const question = game.getCurrentQuestion();
    setCurrentQuestion(question);
  };
  useEffect(() => {
    initializeGame();
  }, [user.id]);

  const displayPopup = (title, content, txt1, txt2) => {
    setPopupVisible(true);
    setPopupTitle(title);
    setPopupContent(content);
    setBtn1Txt(txt1);
    setBtn2Txt(txt2);
  };

  const exitGame = () => {
    setPopupVisible(false);
    navigation.goBack();
  };

  const handleTimerEnd = () => {
    displayPopup("Game Over", "Pay attention to the time", "Exit", "Retry");
  };

  const handleExitButton = () => {
    displayPopup(
      "Exit Game",
      "Are you sure you want to exit ?",
      "Confirm",
      "Cancel"
    );
  };

  const handlePopupButtonPress = (btn2Txt) => {
    if (btn2Txt === "Cancel") {
      setPopupVisible(false);
    } else if (btn2Txt === "Retry") {
      handleResetGame();
    }
  };

  const handleResetGame = async () => {
    setPopupVisible(false);
    setResetTimer(true);

    if (gameplay) {
      await initializeGame();
    }
    setTimeout(() => setResetTimer(false), 0);
  };

  if (!currentQuestion) {
    return <Text>Loading...</Text>; // Or a loading spinner
  }

  const handleButtonPress = (answer) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correct_word) {
      setIsAnswerCorrect(true);
      handleCorrectAnswer();
    } else {
      setIsAnswerCorrect(false);
      handleIncorrectAnswer();
    }
  };

  const handleCorrectAnswer = () => {
    setTimeout(() => {
      gameplay.incrementIndex();
      const question = gameplay.getCurrentQuestion();
      setCurrentQuestion(question);
      setCurrentIndex(gameplay.getCurrentIndex());
      setResetTimer(true);
    }, 1000);
  };

  const handleIncorrectAnswer = () => {
    setStopTimer(true);
    setTimeout(() => {
      displayPopup(
        "Game Over",
        "You choose the wrong answer",
        "Exit",
        "Try Again"
      );
    }, 1000);
  };

  const getButtonStyle = (answer) => {
    if (selectedAnswer === answer) {
      return isAnswerCorrect
        ? [s.buttonAnswer, { borderWidth: 2, borderColor: "#22ff00" }]
        : [s.buttonAnswer, { borderWidth: 2, borderColor: "#d10909" }];
    }
    return s.buttonAnswer;
  };

  const borderColors = [
    "#7262be",
    "#4938a2",
    "#57349c",
    "#a2389d",
    "#c24ba8",
    "#ef73b7",
    "#ffdcdb",
    "#641e91",
    "#992ea8",
    "#fdffff",
    "#fd9aaf",
    "#fba4bc",
    "#ab44a8",
    "#8a39a2",
    "#7934a1",
    "#522e9d",
    "#904ba3",
    "#7943a0",
  ];

  return (
    <ImageBackground
      resizeMode="cover"
      style={s.img_background}
      source={backgroundImg}
    >
      <View style={s.container}>
        <View style={s.appBar}>
          <Image source={appBarImg} style={s.topBarImg} />
        </View>
        <LinearGradient
          colors={borderColors}
          style={s.topGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <View style={s.questionSection}>
          <View style={s.questionNumberView}>
            <Txt style={s.questionNumberTxt}>Question </Txt>
            <Txt style={s.currentQuestionTxt}>{currentIndex + 1}</Txt>
            <Txt style={s.questionNumberTxt}>/10</Txt>
          </View>
          <View style={s.question}>
            <Txt style={s.questionTxt}>{currentQuestion.partial_sentence}</Txt>
          </View>
        </View>
        <Timer
          onTimerEnd={handleTimerEnd}
          reset={resetTimer}
          stop={stopTimer}
        />
        <View style={s.answerSection}>
          <TouchableOpacity
            style={getButtonStyle(currentQuestion.first_word)}
            onPress={() => handleButtonPress(currentQuestion.first_word)}
          >
            <Text style={s.buttonAnswerTxt}>{currentQuestion.first_word}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={getButtonStyle(currentQuestion.second_word)}
            onPress={() => handleButtonPress(currentQuestion.second_word)}
          >
            <Text style={s.buttonAnswerTxt}>{currentQuestion.second_word}</Text>
          </TouchableOpacity>
        </View>
        <View style={s.bottomView}>
          <TouchableOpacity style={s.exitButton} onPress={handleExitButton}>
            <View style={s.exitIconView}>
              <Image source={exitIcon} style={s.exitGameIcon} />
            </View>
          </TouchableOpacity>

          <EndGamePopup
            visible={popupVisible}
            title={popupTitle}
            content={popupContent}
            onPressBtn1={() => exitGame()}
            onPressBtn2={() => handlePopupButtonPress(btn2Txt)}
            btn1Txt={btn1Txt}
            btn2Txt={btn2Txt}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
