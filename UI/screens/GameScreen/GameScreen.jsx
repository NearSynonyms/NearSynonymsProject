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
import Loading from "../../components/loading/Loading";
import apiService from "../../API/ApiService";
import {
  playBackgroundMusic,
  stopBackgroundMusic,
  sounds,
  playSoundEffect,
  setBackgroundMusicVolume,
} from "../../sounds/SoundManager";

export default function GameScreen({ route, navigation }) {
  const { backgroundImg, homeLogo, appBarImg, exitIcon, user } = route.params;
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
  const [displayFullSentence, setDisplayFullSentence] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const initializeGame = async () => {
    const game = new Gameplay(user);
    await game.init();
    setGameplay(game);
    const question = game.getCurrentQuestion();
    setCurrentQuestion(question);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setDisplayFullSentence(false);
    setShowFireworks(false);
  };
  useEffect(() => {
    initializeGame();
    stopBackgroundMusic();
    playBackgroundMusic(sounds.gameBackground);

    return () => {
      stopBackgroundMusic();
      playBackgroundMusic(sounds.homeBackground);
    };
  }, [user.id]);

  useEffect(() => {
    if (currentIndex === 10 && isAnswerCorrect === true) {
      handleGameCompleted();
    }
  }, [currentIndex, isAnswerCorrect]);

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

  const handleTimerEnd = async () => {
    setPopupVisible(false);
    displayPopup("Game Over", "Pay attention to the time", "Exit", "Try Again");
    await updateHistory(currentIndex);
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
    } else if (btn2Txt === "Try Again" || btn2Txt === "Play Again") {
      setCurrentQuestion(null);
      handleResetGame();
    }
  };

  const handleResetGame = async () => {
    setButtonsDisabled(false);
    stopBackgroundMusic();
    playBackgroundMusic(sounds.gameBackground);
    setResetTimer(false);
    setStopTimer(true);
    setPopupVisible(false);
    await initializeGame();
    setTimeout(() => {
      setStopTimer(false);
      setResetTimer(true);
    }, 0);
  };
  const handleGameCompleted = async () => {
    setPopupVisible(false);
    displayPopup(
      "Congratulations!",
      "You've answered all the questions correctly!",
      "Exit",
      "Play Again"
    );
    setShowFireworks(true);
    await playSoundEffect(sounds.win);
    stopBackgroundMusic();
    await updateHistory(10);
  };

  const handleButtonPress = async (answer) => {
    if (buttonsDisabled) return;
    setButtonsDisabled(true);
    setSelectedAnswer(answer);
    await setBackgroundMusicVolume(0.3);
    if (answer === currentQuestion.correct_word) {
      setIsAnswerCorrect(true);
      await playSoundEffect(sounds.correctAnswer);
      handleCorrectAnswer();
    } else {
      setIsAnswerCorrect(false);
      await playSoundEffect(sounds.incorrectAnswer);
      handleIncorrectAnswer();
    }
    setTimeout(async () => {
      await setBackgroundMusicVolume(0.7);
    }, 500);
  };

  const handleCorrectAnswer = () => {
    setStopTimer(true);
    setDisplayFullSentence(true);

    setTimeout(() => {
      setStopTimer(false);
      setButtonsDisabled(false);
      if (currentIndex < 9) {
        setDisplayFullSentence(false);
        gameplay.incrementIndex();
        const question = gameplay.getCurrentQuestion();
        setCurrentQuestion(question);
        setCurrentIndex(gameplay.getCurrentIndex());
        setResetTimer(true);
        setSelectedAnswer(null);
      } else {
        handleGameCompleted();
      }
    }, 1000);
    setResetTimer(false);
  };

  const handleIncorrectAnswer = async () => {
    setStopTimer(true);
    setDisplayFullSentence(true);
    setTimeout(() => {
      displayPopup(
        "Game Over",
        "You chose the wrong answer",
        "Exit",
        "Try Again"
      );
      setSelectedAnswer(null);
      setButtonsDisabled(false);
    }, 1500);
    await playSoundEffect(sounds.lose);
    stopBackgroundMusic();
    await updateHistory(currentIndex);
  };

  const getButtonStyle = (answer) => {
    if (selectedAnswer === answer) {
      return isAnswerCorrect
        ? [s.buttonAnswer, { borderWidth: 2, borderColor: "#22ff00" }]
        : [s.buttonAnswer, { borderWidth: 2, borderColor: "#d10909" }];
    }
    return s.buttonAnswer;
  };

  const fullSentenceStyle = (sentence, correctWord) => {
    const parts = sentence.split(correctWord);
    return (
      <Txt style={s.questionTxt}>
        {parts[0]}
        <Txt style={{ color: "#8c60a1", fontWeight: "bold" }}>
          {correctWord}
        </Txt>
        {parts[1]}
      </Txt>
    );
  };
  const getFormattedDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  const getFormattedTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  async function updateHistory(correctAnswer) {
    try {
      const data = await apiService.getUserState(user.id);
      console.log(data);
      const difficulty =
        data.difficulty === 3
          ? "High"
          : data.difficulty === 2
          ? "Medium"
          : "Low";

      console.log(difficulty);

      const date = getFormattedDate();
      const time = getFormattedTime();
      await apiService.updateUserHistory(
        user.id,
        difficulty,
        date,
        time,
        correctAnswer
      );
    } catch (error) {
      console.error("Error in updateHistory:", error);
    }
  }

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

  if (!currentQuestion) {
    return <Loading backgroundImg={backgroundImg} homeLogo={homeLogo} />;
  }

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
            {displayFullSentence ? (
              fullSentenceStyle(
                currentQuestion.sentence,
                currentQuestion.correct_word
              )
            ) : (
              <Txt style={s.questionTxt}>
                {currentQuestion.partial_sentence}
              </Txt>
            )}
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
            disabled={buttonsDisabled}
          >
            <Text style={s.buttonAnswerTxt}>{currentQuestion.first_word}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={getButtonStyle(currentQuestion.second_word)}
            onPress={() => handleButtonPress(currentQuestion.second_word)}
            disabled={buttonsDisabled}
          >
            <Text style={s.buttonAnswerTxt}>{currentQuestion.second_word}</Text>
          </TouchableOpacity>
        </View>
        <View style={s.bottomView}>
          <TouchableOpacity
            style={s.exitButton}
            onPress={() => {
              playSoundEffect(sounds.buttonClick);
              handleExitButton();
            }}
          >
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
            isConfetti={showFireworks}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
