import { View } from "react-native";
import { s } from "./GoogleLoginButton.style";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export function GoogleLoginButton({ styleView, onPress }) {
  return (
    <View style={[s.container, styleView]}>
      <FontAwesome.Button
        name="google"
        backgroundColor="#ed3739"
        onPress={onPress}
        justifyContent="center"
        borderRadius={20}
      >
        Login with Google
      </FontAwesome.Button>
    </View>
  );
}
