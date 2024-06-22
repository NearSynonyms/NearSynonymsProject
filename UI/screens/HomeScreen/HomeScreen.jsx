import React, { useState } from "react";
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

const { width, height } = Dimensions.get("window");

export default function HomeScreen({ navigation, user }) {
  const assetsForLoginScreen = [
    require("../../assets/Images/Home.png"),
    require("../../assets/Images/HomeLogo.png"),
  ];

  const isReady = usePreloadAssets(assetsForLoginScreen);
  const [guideVisible, setGuideVisible] = useState(false);

  if (!isReady) {
    return null;
  }

  const backgroundImg = assetsForLoginScreen[0];
  const homeLogo = assetsForLoginScreen[1];

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
          <Txt style={s.txt}>SYNONYMS</Txt>
          <Txt style={s.txt}>GAME</Txt>
        </View>
        <View style={s.btnView}>
          <TouchableOpacity
            style={s.btn}
            onPress={() => navigation.navigate("Exercise")}
          >
            <View style={s.btnContent}>
              <Txt style={s.btnTxt}>Play</Txt>
              <Icon name="play" size={30} color={"#fff"} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.btn}
            onPress={() => navigation.navigate("Profile")}
          >
            <View style={s.btnContent}>
              <Txt style={s.btnTxt}>Settings</Txt>
              <Icon name="cogs" size={30} color={"#fff"} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={s.btn} onPress={() => setGuideVisible(true)}>
            <View style={s.btnContent}>
              <Txt style={s.btnTxt}>Guide </Txt>
              <Icon name="question-circle" size={30} color={"#fff"} />
            </View>
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
