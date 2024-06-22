import React from "react";
import { View, TouchableOpacity } from "react-native";
import { s } from "./RadioButtons.style";
import { Txt } from "../Txt/Txt";
export default function RadioButtons({ options, selectedOption, onSelect }) {
  return (
    <View style={s.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={s.optionContainer}
          onPress={() => onSelect(option)}
        >
          <View style={s.circle}>
            {selectedOption === option && <View style={s.checkedCircle} />}
          </View>
          <Txt style={s.label}>{option}</Txt>
        </TouchableOpacity>
      ))}
    </View>
  );
}
