import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import { s } from "./GuidePopup.style";
import { usePreloadAssets } from "../../hooks/usePreloadAssets";
import { Txt } from "../Txt/Txt";
import {
  sounds,
  playSoundEffect,
  setBackgroundMusicVolume,
} from "../../sounds/SoundManager";
export default function GuidePopup({ visible, onClose }) {
  const [step, setStep] = useState(0);

  const assetsForGuide = [
    require("../../assets/Images/Question.png"),
    require("../../assets/Images/Answer.png"),
  ];

  const isReady = usePreloadAssets(assetsForGuide);
  const [questionImg, setQuestionImg] = useState(null);
  const [answerImg, setAnswerImg] = useState(null);
  useEffect(() => {
    if (visible) {
      playSoundEffect(sounds.popup);
    }
  }, [visible]);
  useEffect(() => {
    if (isReady) {
      setQuestionImg(assetsForGuide[0]);
      setAnswerImg(assetsForGuide[1]);
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const onGuideClose = () => {
    onClose();
    setStep(0);
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <View style={s.content}>
            <Txt style={s.text}>
              • This game is a word completion game in sentences.
            </Txt>
            <Txt style={s.text}>
              • The game aims to teach the user how to correctly use synonyms
              according to the sentence.
            </Txt>
            <Txt style={s.text}>
              • Given two synonyms with the same meaning, there is one word that
              fits more correctly in terms of logic and correct language in the
              sentence.
            </Txt>
            <Txt style={s.text}>
              • The user must choose the word he thinks is more correct.
            </Txt>

            <TouchableOpacity
              style={s.nextButton}
              onPress={() => {
                playSoundEffect(sounds.buttonClick);
                handleNext();
              }}
            >
              <Txt style={s.buttonText}>Next</Txt>
            </TouchableOpacity>
          </View>
        );
      case 1:
        return (
          <View style={s.content}>
            <Image source={questionImg} style={s.image} />
            <View style={s.buttonRow}>
              <TouchableOpacity
                style={s.prevButton}
                onPress={() => {
                  playSoundEffect(sounds.buttonClick);
                  handlePrev();
                }}
              >
                <Txt style={s.buttonText}>Prev</Txt>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.nextButton}
                onPress={() => {
                  playSoundEffect(sounds.buttonClick);
                  handleNext();
                }}
              >
                <Txt style={s.buttonText}>Next</Txt>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={s.content}>
            <Image source={answerImg} style={s.image} />
            <View style={s.buttonRow}>
              <TouchableOpacity
                style={s.prevButton}
                onPress={() => {
                  playSoundEffect(sounds.buttonClick);
                  handlePrev();
                }}
              >
                <Txt style={s.buttonText}>Prev</Txt>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.nextButton}
                onPress={() => {
                  playSoundEffect(sounds.buttonClick);
                  onGuideClose();
                }}
              >
                <Txt style={s.buttonText}>Close</Txt>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onGuideClose}
    >
      <View style={s.overlay}>
        <View style={s.popup}>
          <View style={s.header}>
            <TouchableOpacity
              style={s.closeButton}
              onPress={() => {
                playSoundEffect(sounds.buttonClick);
                onGuideClose();
              }}
            >
              <Txt style={s.closeButtonText}>X</Txt>
            </TouchableOpacity>
            <Txt style={s.title}>Guide</Txt>
          </View>
          <View style={s.contentView}>{renderContent()}</View>
        </View>
      </View>
    </Modal>
  );
}
