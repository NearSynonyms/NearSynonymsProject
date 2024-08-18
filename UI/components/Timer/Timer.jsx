import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { s } from "./Timer.style";

export default function Timer({ onTimerEnd, reset, stop }) {
  const timerWidth = useRef(new Animated.Value(1)).current;
  const isRunning = useRef(true);
  useEffect(() => {
    if (reset) {
      isRunning.current = false;
      timerWidth.setValue(1); // Reset the timer width to full
      startTimer();
    }
  }, [reset]);

  const startTimer = () => {
    isRunning.current = true;
    Animated.timing(timerWidth, {
      toValue: 0,
      duration: 10000, // 45 seconds
      useNativeDriver: false,
    }).start(() => {
      if (isRunning.current && onTimerEnd) {
        onTimerEnd();
      }
    });
  };

  useEffect(() => {
    if (stop) {
      isRunning.current = false;
    }
  }, [stop]);

  useEffect(() => {
    startTimer();
  }, [timerWidth]);

  const widthInterpolate = timerWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const opacityInterpolate = timerWidth.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0.2, 0.5, 1],
  });

  return (
    <View style={s.container}>
      <Animated.View
        style={[
          s.timerLine,
          { width: widthInterpolate, opacity: opacityInterpolate },
        ]}
      />
    </View>
  );
}
