import React, { useEffect } from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import { Txt } from "../Txt/Txt";
import { s } from "./EndGamePopup.style";
import { Fireworks } from "../fireworks/Fireworks";
import {
  sounds,
  playSoundEffect,
  setBackgroundMusicVolume,
} from "../../sounds/SoundManager";

export default function EndGamePopup({
  visible,
  title,
  content,
  onPressBtn1,
  onPressBtn2,
  btn1Txt,
  isConfetti,
  btn2Txt,
}) {
  useEffect(() => {
    if (visible) {
      setBackgroundMusicVolume(0);
      playSoundEffect(sounds.popup);
    } else {
      setBackgroundMusicVolume(1);
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onPressBtn1}
    >
      <View style={s.overlay}>
        <View style={[s.popup, { zIndex: 10 }]}>
          <View style={s.header}>
            <Txt style={s.title}>{title}</Txt>
          </View>
          <View style={s.viewInfo}>
            <Txt style={s.content}>{content}</Txt>
            <View style={s.btnView}>
              <TouchableOpacity onPress={onPressBtn1} style={s.btn}>
                <Txt style={s.btnText}>{btn1Txt}</Txt>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressBtn2} style={s.btn}>
                <Txt style={s.btnText}>{btn2Txt}</Txt>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {isConfetti && <Fireworks />}
    </Modal>
  );
}
