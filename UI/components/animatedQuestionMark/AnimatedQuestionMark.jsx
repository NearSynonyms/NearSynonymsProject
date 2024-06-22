import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text } from "react-native";
import { s } from "./AnimatedQuestionMark.style";
export default function AnimatedQuestionMark({
  startX,
  startY,
  endX,
  endY,
  duration,
}) {
  const translateX = useRef(new Animated.Value(startX)).current;
  const translateY = useRef(new Animated.Value(startY)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: endX,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: endY,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateX, translateY, rotate, endX, endY, duration]);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        s.questionMarkContainer,
        {
          transform: [
            { translateX },
            { translateY },
            { rotate: rotateInterpolate },
          ],
        },
      ]}
    >
      <Text style={s.questionMark}>?</Text>
    </Animated.View>
  );
}
