import { useAuth } from "@clerk/clerk-expo";
import { View, Button } from "react-native";
export default function SignOut() {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View style={{ marginTop: 10 }}>
      <Button
        title="Sign Out"
        color={"red"}
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}
