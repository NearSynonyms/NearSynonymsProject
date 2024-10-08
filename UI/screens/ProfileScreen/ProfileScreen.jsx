import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Txt } from "../../components/Txt/Txt";
import Icon from "react-native-vector-icons/FontAwesome";
import CircularFrameWithButton from "../../components/circularFrameWithButton/CircularFrameWithButton";
import RadioButtons from "../../components/RadioButtons/RadioButtons";
import Popup from "../../components/popup/Popup";
import SignOut from "../../components/signOut/SignOut";
import { s } from "./ProfileScreen.style";
import apiService from "../../API/ApiService";
import Loading from "../../components/loading/Loading";
import { sounds, playSoundEffect } from "../../sounds/SoundManager";

export default function ProfileScreen({ route, navigation }) {
  const {
    backgroundImg,
    homeLogo,
    historyIcon,
    easyIcon,
    mediumIcon,
    highIcon,
    user,
  } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Low");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignOut, setIsSignOut] = useState(false);
  const options = ["Low", "Medium", "High"];

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        if (user && user.id) {
          try {
            const data = await apiService.getUserState(user.id);
            setSelectedImage(data?.picture || null);
            const difficulty = parseInt(data?.difficulty, 10);
            setSelectedOption(
              difficulty === 3 ? "High" : difficulty === 2 ? "Medium" : "Low"
            );
          } catch (error) {
            console.error("Failed to fetch user data:", error);
          }
        }
      };

      fetchUserData();
    }, [user])
  );

  useEffect(() => {
    if (selectedImage) {
      setSelectedImage(selectedImage);
    }
  }, [selectedImage, loading]);

  const isHebrew = (string) => {
    return /[\u0590-\u05FF]/.test(string);
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    if (isHebrew(string)) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const firstName = capitalizeFirstLetter(user.firstName);
  const lastName = capitalizeFirstLetter(user.lastName);

  const handleImagePicked = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const textLevelToInteger = () => {
    switch (selectedOption) {
      case "Low":
        return 1;
      case "Medium":
        return 2;
      case "High":
        return 3;
      default:
        return 1;
    }
  };

  const handlePressOnSave = async (title, content) => {
    setLoading(true);
    try {
      const token = user.id;
      const difficulty = textLevelToInteger();
      let formData = new FormData();

      formData.append("token", token);
      formData.append("difficulty", difficulty);

      if (selectedImage) {
        const uriParts = selectedImage.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append("picture", {
          uri: selectedImage,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      await apiService.updateUserProfile(formData);

      setPopupTitle(title);
      setPopupContent(content);
      setPopupVisible(true);
    } catch (error) {
      Alert.alert("Error", "Failed to save the changes.");
    } finally {
      if (!isSignOut) {
        const data = await apiService.getUserState(user.id);
        setSelectedImage(data?.picture || null);
      }
      setLoading(false);
    }
  };

  const handlePressOnSupportSuction = (title, content) => {
    setPopupTitle(title);
    setPopupContent(content);
    setPopupVisible(true);
  };

  const aboutUsText = `
  • We are a team of five dedicated developers in our third year of a bachelor's degree in computer science.

  • Our team members, Yarin, Guy, Itay, Shay, and Yarden, are passionate about creating innovative and user-friendly applications.
  
  • Together, we are committed to leveraging our skills and knowledge to develop impactful solutions.
  `;
  if (loading) {
    return <Loading backgroundImg={backgroundImg} homeLogo={homeLogo} />;
  }

  return (
    <SafeAreaView style={s.container}>
      <ScrollView>
        <View style={s.header}>
          <TouchableOpacity
            onPress={() => {
              playSoundEffect(sounds.buttonClick);
              navigation.goBack();
            }}
            style={s.backButton}
          >
            <Icon name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Txt style={s.headerText}>Settings</Txt>
        </View>
        <View style={s.profileContainer}>
          <View style={s.imageAndNameContainer}>
            <View style={s.imageContainer}>
              <CircularFrameWithButton
                onImagePicked={handleImagePicked}
                selectedImage={selectedImage}
              />
            </View>
            <View style={s.profileInfo}>
              <Txt style={s.profileName}>{firstName}</Txt>
              <Txt style={s.profileName}>{lastName}</Txt>
            </View>
          </View>
          <View style={s.historyContainer}>
            <TouchableOpacity
              style={s.historyBtn}
              onPress={() => {
                playSoundEffect(sounds.buttonClick);
                navigation.navigate("History", {
                  backgroundImg: backgroundImg,
                  easyIcon: easyIcon,
                  mediumIcon: mediumIcon,
                  highIcon: highIcon,
                  homeLogo: homeLogo,
                  user: user,
                });
              }}
            >
              <Txt style={s.historyTxt}>Statistics</Txt>
              <Image source={historyIcon} style={s.historyIcon}></Image>
            </TouchableOpacity>
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
            onPress={() => {
              playSoundEffect(sounds.buttonClick);
              handlePressOnSupportSuction("Contact", "nearsynonyms@gmail.com");
            }}
          >
            <Txt style={s.buttonsText}>Contact</Txt>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.aboutUs}
            onPress={() => {
              playSoundEffect(sounds.buttonClick);
              handlePressOnSupportSuction("About Us", aboutUsText);
            }}
          >
            <Txt style={s.buttonsText}>About us</Txt>
          </TouchableOpacity>

          <Popup
            visible={popupVisible}
            onClose={() => {
              setPopupVisible(false);
            }}
            title={popupTitle}
            content={popupContent}
            backgroundColor="#8c60a1"
            buttonTxt="Close"
          />
        </View>
        <View style={s.bottomLine}></View>
        <View style={s.fotter}>
          <TouchableOpacity
            style={s.saveBtn}
            onPress={() => {
              playSoundEffect(sounds.buttonClick);
              handlePressOnSave(
                "Update Changes",
                "Your changes have been successfully updated"
              );
            }}
          >
            <Txt style={s.saveTxt}>Save Changes</Txt>
          </TouchableOpacity>
          <SignOut
            onSignOut={() => {
              playSoundEffect(sounds.buttonClick);
              setIsSignOut(true);
              handlePressOnSave(
                "Update Changes",
                "Your changes have been successfully updated"
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
