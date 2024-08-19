import React, { useState } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { s } from "./CircularFrameWithButton.style";

export default function CircularFrameWithButton({ onImagePicked }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (newStatus !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access the gallery is required to change the profile picture.",
          [{ text: "OK" }]
        );
        return; // If permission is denied, do nothing.
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);
      onImagePicked(imageUri);
    }
  };

  return (
    <View style={s.container}>
      <View style={s.circularFrame}>
        <Image
          key={selectedImage}
          source={
            selectedImage
              ? { uri: selectedImage }
              : require("../../assets/Images/Avatar.png")
          }
          style={s.image}
        />
      </View>
      <TouchableOpacity style={s.editIconContainer} onPress={pickImage}>
        <Icon name="edit" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
