import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { s } from "./HistoryScreen.style";
import { Txt } from "../../components/Txt/Txt";
import StatsPopup from "../../components/statsPopup/StatsPopup";
import apiService from "../../API/ApiService";
import BarPairWithLine from "../../components/statsGraph/StatGraph";
import Icon from "react-native-vector-icons/FontAwesome";
import { sounds, playSoundEffect } from "../../sounds/SoundManager";
import Loading from "../../components/loading/Loading";

export default function HistoryScreen({ route, navigation }) {
  const { backgroundImg, easyIcon, mediumIcon, highIcon, homeLogo, user } =
    route.params;
  const [gameHistory, setGameHistory] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const fetchUserHistory = async () => {
      if (user && user.id) {
        try {
          const history = await apiService.getUserHistory(user.id);
          setGameHistory(history);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUserHistory();
  }, [user]);

  function getDifficultyImage(difficulty) {
    switch (difficulty) {
      case "Low":
        return easyIcon;
      case "Medium":
        return mediumIcon;
      case "High":
        return highIcon;
      default:
        return null;
    }
  }

  const calculateAverage = (difficulty) => {
    if (!gameHistory || gameHistory.length === 0) return 0;

    const filteredGames = gameHistory.filter(
      (game) => game.difficulty === difficulty
    );
    const totalCorrectAnswers = filteredGames.reduce(
      (sum, game) => sum + game.correct_answers,
      0
    );
    return filteredGames.length > 0
      ? totalCorrectAnswers / filteredGames.length
      : 0;
  };

  const renderHistoryItem = ({ item }) => (
    <LinearGradient
      colors={["#7303c0", "#ec38bc"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.card}
    >
      <View style={s.cardHeader}>
        <Txt style={s.date}>{item.date}</Txt>
        <Txt style={s.time}>{item.time}</Txt>
      </View>
      <View style={s.cardBody}>
        <View style={s.levelContainer}>
          <Txt style={s.difficulty}>{item.difficulty}</Txt>
          <Image
            source={getDifficultyImage(item.difficulty)}
            style={s.levelImage}
          />
        </View>
        <Txt style={s.correctAnswers}>
          Correct Answers: {item.correct_answers}/10
        </Txt>
      </View>
    </LinearGradient>
  );

  const handleViewProgress = () => {
    setPopupVisible(true);
  };

  const averageLow = calculateAverage("Low");
  const averageMedium = calculateAverage("Medium");
  const averageHigh = calculateAverage("High");

  if (!gameHistory) {
    return <Loading backgroundImg={backgroundImg} homeLogo={homeLogo} />;
  }

  return (
    <ImageBackground source={backgroundImg} style={s.img_background}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={s.scrollViewContent}>
          <TouchableOpacity
            onPress={() => {
              playSoundEffect(sounds.buttonClick);
              navigation.goBack();
            }}
            style={s.backButton}
          >
            <Icon name="arrow-left" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={s.viewProgressButton}
            onPress={() => {
              playSoundEffect(sounds.buttonClick);
              handleViewProgress();
            }}
          >
            <Txt style={s.viewProgressButtonText}>View Progress</Txt>
          </TouchableOpacity>
          <FlatList
            data={gameHistory}
            renderItem={renderHistoryItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        <StatsPopup
          visible={popupVisible}
          onClose={() => setPopupVisible(false)}
          title="Performance Overview"
          content={
            <BarPairWithLine
              averageLow={averageLow}
              averageMedium={averageMedium}
              averageHigh={averageHigh}
            />
          }
          backgroundColor="#8c60a1"
          buttonTxt="Close"
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
