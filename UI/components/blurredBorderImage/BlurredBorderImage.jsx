import React from "react";
import { View, Image } from "react-native";
import { s } from "./BlurredBorderImage.style";
import { BlurView } from "expo-blur";
export const BlurredBorderImage = ({ source, blurIntensity = 10, style }) => {
  return (
    <View style={s.container}>
      <BlurView style={s.blurView} intensity={blurIntensity}>
        <Image source={source} style={style} />
      </BlurView>
    </View>
  );
};
