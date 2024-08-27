import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { s } from "./Timer.style";

export default function Timer({ onTimerEnd, reset, stop }) {
  const timerWidth = useRef(new Animated.Value(1)).current;
  const isRunning = useRef(true);
  const animation = useRef(null);
  useEffect(() => {
    if (reset) {
      isRunning.current = false;
      timerWidth.setValue(1); // Reset the timer width to full
      startTimer();
    }
  }, [reset]);

  const startTimer = () => {
    isRunning.current = true;
    animation.current = Animated.timing(timerWidth, {
      toValue: 0,
      duration: 60000, // 45 seconds
      useNativeDriver: false,
    });
    animation.current.start(() => {
      if (isRunning.current && onTimerEnd) {
        onTimerEnd();
      }
    });
  };

  useEffect(() => {
    if (stop) {
      isRunning.current = false;
      if (animation.current) {
        animation.current.stop();
      }
    }
  }, [stop]);

  useEffect(() => {
    startTimer();
  }, []);

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
