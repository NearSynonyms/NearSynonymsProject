import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Txt } from "../../components/Txt/Txt";
import Icon from "react-native-vector-icons/FontAwesome";
import CircularFrameWithButton from "../../components/circularFrameWithButton/CircularFrameWithButton";
import RadioButtons from "../../components/RadioButtons/RadioButtons";
import Popup from "../../components/popup/Popup";
import SignOut from "../../components/signOut/SignOut";
import { s } from "./ProfileScreen.style";

export default function ProfileScreen({ navigation, user }) {
  const isHebrew = (string) => {
    return /[\u0590-\u05FF]/.test(string);
  };
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    if (isHebrew(string)) return string; // If the string is in Hebrew, return it as is
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const firstName = capitalizeFirstLetter(user.firstName);
  const lastName = capitalizeFirstLetter(user.lastName);
  const [selectedOption, setSelectedOption] = useState("Low");
  const options = ["Low", "Medium", "High"];
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState("");

  const handlePressOnSupportSuction = (title, content) => {
    setPopupTitle(title);
    setPopupContent(content);
    setPopupVisible(true);
  };

  const handlePressOnSave = (title, content) => {
    //call to server api

    setPopupTitle(title);
    setPopupContent(content);
    setPopupVisible(true);
  };

  const aboutUsText = `
  • We are a team of five dedicated developers in our third year of a bachelor's degree in computer science.

  • Our team members, Yarin, Guy, Itay, Shay, and Yarden, are passionate about creating innovative and user-friendly applications.
  
  • Together, we are committed to leveraging our skills and knowledge to develop impactful solutions.
  `;
  return (
    <SafeAreaView style={s.container}>
      <ScrollView>
        <View style={s.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={s.backButton}
          >
            <Icon name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Txt style={s.headerText}>Settings</Txt>
        </View>
        <View style={s.profileContainer}>
          <View style={s.imageContainer}>
            <CircularFrameWithButton />
          </View>
          <View style={s.profileInfo}>
            <Txt style={s.profileName}>{firstName}</Txt>
            <Txt style={s.profileName}>{lastName}</Txt>
          </View>
        </View>
        <View style={s.bottomLine}></View>
        <View style={s.section}>
          <Txt style={s.sectionTitle}>Difficulty</Txt>
          <RadioButtons
            options={options}
            selectedOption={selectedOption}
            onSelect={(option) => setSelectedOption(option)}
          />
        </View>
        <View style={s.bottomLine}></View>
        <View style={s.section}>
          <Txt style={s.sectionTitle}>Support</Txt>

          <TouchableOpacity
            onPress={() =>
              handlePressOnSupportSuction("Contact", "nearsynonyms@gmail.com")
            }
          >
            <Txt style={s.buttonsText}>Contact</Txt>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.aboutUs}
            onPress={() => handlePressOnSupportSuction("About Us", aboutUsText)}
          >
            <Txt style={s.buttonsText}>About us</Txt>
          </TouchableOpacity>

          <Popup
            visible={popupVisible}
            onClose={() => setPopupVisible(false)}
            title={popupTitle}
            content={popupContent}
          />
        </View>
        <View style={s.bottomLine}></View>
        <View style={s.fotter}>
          <TouchableOpacity
            style={s.saveBtn}
            onPress={() =>
              handlePressOnSave(
                "Update Changes",
                "Your changes has been successfully updated"
              )
            }
          >
            <Txt style={s.saveTxt}>Save Changes</Txt>
          </TouchableOpacity>
          <SignOut />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
