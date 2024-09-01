import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { s } from "./HomeScreen.style";
import { Txt } from "../../components/Txt/Txt";
import { usePreloadAssets } from "../../hooks/usePreloadAssets";
import { BlurredBorderImage } from "../../components/blurredBorderImage/BlurredBorderImage";
import AnimatedQuestionMark from "../../components/animatedQuestionMark/AnimatedQuestionMark";
import Icon from "react-native-vector-icons/FontAwesome";
import GuidePopup from "../../components/guidePopup/GuidePopup";
import { sounds, playSoundEffect } from "../../sounds/SoundManager";

const { width, height } = Dimensions.get("window");

export default function HomeScreen({ navigation, user }) {
  const assetsForLoginScreen = [
    require("../../assets/Images/Home.png"),
    require("../../assets/Images/HomeLogo.png"),
    require("../../assets/Images/appbar.png"),
    require("../../assets/icons/ExitGame.png"),
    require("../../assets/Images/learnBackground.png"),
    require("../../assets/icons/chatGptLogo.png"),
    require("../../assets/icons/historyIcon.png"),
    require("../../assets/icons/easyIcon.png"),
    require("../../assets/icons/mediumIcon.png"),
    require("../../assets/icons/highIcon.png"),
  ];

  const isReady = usePreloadAssets(assetsForLoginScreen);
  const [guideVisible, setGuideVisible] = useState(false);

  if (!isReady) {
    return null;
  }

  const backgroundImg = assetsForLoginScreen[0];
  const homeLogo = assetsForLoginScreen[1];
  const appBarImg = assetsForLoginScreen[2];
  const exitIcon = assetsForLoginScreen[3];
  const learnBackground = assetsForLoginScreen[4];
  const chatGPTLogo = assetsForLoginScreen[5];
  const historyIcon = assetsForLoginScreen[6];
  const easyIcon = assetsForLoginScreen[7];
  const mediumIcon = assetsForLoginScreen[8];
  const highIcon = assetsForLoginScreen[9];

  const questionMarks = Array.from({ length: 10 }, (_, index) => (
    <AnimatedQuestionMark
      key={index}
      startX={Math.random() * (width - 50)}
      startY={Math.random() * (height - 50)}
      endX={Math.random() * (width - 50)}
      endY={Math.random() * (height - 50)}
      duration={3000 + Math.random() * 2000}
    />
  ));

  return (
    <ImageBackground
      resizeMode="cover"
      style={s.img_background}
      source={backgroundImg}
    >
      {questionMarks}
      <SafeAreaView style={s.container}>
        <View style={s.logoView}>
          <BlurredBorderImage
            source={homeLogo}
            blurIntensity={30}
            style={s.homeLogo}
          />
        </View>
        <View style={s.txtView}>
          <Txt style={s.txt}>NEAR</Txt>
          <Txt style={s.txt}>SYNONYMS</Txt>
        </View>
        <View style={s.btnView}>
          <TouchableOpacity
            style={s.btn}
            onPress={() => {
              playSoundEffect(sounds.buttonClick);
              navigation.navigate("Game", {
                backgroundImg,
                homeLogo,
                appBarImg,
                exitIcon,
                user,
              });
            }}
          >
            <View style={s.btnContent}>
              <Txt style={s.btnTxt}>Play</Txt>
              <Icon name="play" size={30} color={"#fff"} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.btn}
            onPress={() => {
              playSoundEffect(sounds.buttonClick);
              setGuideVisible(true);
            }}
          >
            <View style={s.btnContent}>
              <Txt style={s.btnTxt}>Guide </Txt>
              <Icon name="question-circle" size={30} color={"#fff"} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.btn}
            onPress={() => {
              playSoundEffect(sounds.buttonClick);
              navigation.navigate("Learn", {
                learnBackground,
                exitIcon,
                homeLogo,
                chatGPTLogo,
                user,
              });
            }}
          >
            <View style={s.btnContent}>
              <Txt style={s.btnTxt}>Learn</Txt>
              <Icon name="graduation-cap" size={30} color={"#fff"} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={s.footer}>
          <TouchableOpacity
            style={s.fotterBtn}
            onPress={() => {
              playSoundEffect(sounds.buttonClick);
              navigation.navigate("Profile", {
                backgroundImg,
                homeLogo,
                historyIcon,
                easyIcon,
                mediumIcon,
                highIcon,
                user,
              });
            }}
          >
            <Icon name="cogs" size={35} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <GuidePopup
          visible={guideVisible}
          onClose={() => setGuideVisible(false)}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
