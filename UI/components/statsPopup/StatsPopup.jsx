import React, { useEffect } from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import { Txt } from "../Txt/Txt";
import { s } from "./StatsPopup.style";
import { sounds, playSoundEffect } from "../../sounds/SoundManager";
export default function StatsPopup({
  visible,
  onClose,
  title,
  content,
  backgroundColor,
  buttonTxt,
}) {
  useEffect(() => {
    if (visible) {
      playSoundEffect(sounds.popup);
    }
  }, [visible]);
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={s.overlay}>
        <View style={s.popup}>
          <View style={[s.header, { backgroundColor }]}>
            <Txt style={s.title}>{title}</Txt>
          </View>
          <View style={s.viewInfo}>
            <Txt style={s.content}>{content}</Txt>
            <TouchableOpacity
              onPress={() => {
                playSoundEffect(sounds.buttonClick);
                onClose();
              }}
              style={[s.closeButton, { backgroundColor }]}
            >
              <Txt style={s.closeButtonText}>{buttonTxt}</Txt>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
