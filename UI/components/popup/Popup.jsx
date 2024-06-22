import React from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import { Txt } from "../Txt/Txt";
import { s } from "./Popup.style";
export default function Popup({ visible, onClose, title, content }) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={s.overlay}>
        <View style={s.popup}>
          <View style={s.header}>
            <Txt style={s.title}>{title}</Txt>
          </View>
          <View style={s.viewInfo}>
            <Txt style={s.content}>{content}</Txt>
            <TouchableOpacity onPress={onClose} style={s.closeButton}>
              <Txt style={s.closeButtonText}>Close</Txt>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
