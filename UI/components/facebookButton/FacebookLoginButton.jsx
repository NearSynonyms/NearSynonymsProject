import { View } from "react-native";
import { s } from "./FacebookLoginButton.style";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export function FacebookLoginButton({ onPress }) {
  return (
    <View style={s.container}>
      <FontAwesome.Button
        name="facebook"
        backgroundColor="#3b5998"
        onPress={onPress}
        justifyContent="center"
        borderRadius={20}
      >
        Login with Facebook
      </FontAwesome.Button>
    </View>
  );
}
