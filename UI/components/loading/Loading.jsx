import React, { useEffect, useRef, useState } from "react";
import { Txt } from "../Txt/Txt";
import { View, ImageBackground, Animated } from "react-native";
import { BlurredBorderImage } from "../blurredBorderImage/BlurredBorderImage";
import { s } from "./Loading.style";

export default function Loading({ backgroundImg, homeLogo }) {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const startSpinning = () => {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    };

    startSpinning();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    let dotCount = 0;
    const interval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      setLoadingText(`Loading${".".repeat(dotCount)}`);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      resizeMode="cover"
      style={s.img_background}
      source={backgroundImg}
    >
      <View style={s.logoView}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <BlurredBorderImage
            source={homeLogo}
            blurIntensity={30}
            style={s.homeLogo}
          />
        </Animated.View>
      </View>
      <Txt style={s.loadingText}>{loadingText}</Txt>
    </ImageBackground>
  );
}
