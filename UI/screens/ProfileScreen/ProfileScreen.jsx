import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Txt } from "../../components/Txt/Txt";
import Icon from "react-native-vector-icons/FontAwesome";
import CircularFrameWithButton from "../../components/circularFrameWithButton/CircularFrameWithButton";
import RadioButtons from "../../components/RadioButtons/RadioButtons";
import Popup from "../../components/popup/Popup";
import SignOut from "../../components/signOut/SignOut";

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

  const handlePress = (title, content) => {
    setPopupTitle(title);
    setPopupContent(content);
    setPopupVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Txt style={styles.headerText}>Settings</Txt>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <CircularFrameWithButton />
          </View>
          <View style={styles.profileInfo}>
            <Txt style={styles.profileName}>{firstName}</Txt>
            <Txt style={styles.profileName}>{lastName}</Txt>
          </View>
        </View>
        <View style={styles.bottomLine}></View>
        <View style={styles.section}>
          <Txt style={styles.sectionTitle}>Difficulty</Txt>
          <RadioButtons
            options={options}
            selectedOption={selectedOption}
            onSelect={(option) => setSelectedOption(option)}
          />
        </View>
        <View style={styles.bottomLine}></View>
        <View style={styles.section}>
          <Txt style={styles.sectionTitle}>Support</Txt>

          <TouchableOpacity
            onPress={() => handlePress("Contact", "nearsynonyms@gmail.com")}
          >
            <Txt style={styles.buttonsText}>Contact</Txt>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.aboutUs}
            onPress={() =>
              handlePress(
                "About Us",
                "We are a team of five dedicated developers in our third year of a bachelor's degree in computer science. Our team members, Yarin, Guy, Itay, Shay, and Yarden, are passionate about creating innovative and user-friendly applications. Together, we are committed to leveraging our skills and knowledge to develop impactful solutions."
              )
            }
          >
            <Txt style={styles.buttonsText}>About us</Txt>
          </TouchableOpacity>

          <Popup
            visible={popupVisible}
            onClose={() => setPopupVisible(false)}
            title={popupTitle}
            content={popupContent}
          />
        </View>
        <View style={styles.bottomLine}></View>
        <SignOut />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#8c60a1",
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    left: 10,
  },
  profileContainer: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  bottomLine: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    marginHorizontal: 20,
  },
  section: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonsText: {
    fontSize: 20,
    marginBottom: 5,
  },
  aboutUs: {
    marginBottom: 20,
  },
});
