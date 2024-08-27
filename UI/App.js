import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from "@clerk/clerk-expo";
import AppNavigator from "./navigation/AppNavigator";
import { EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY } from "@env";
import AuthScreen from "./screens/AuthScreen/AuthScreen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import {
  playBackgroundMusic,
  stopBackgroundMusic,
  sounds,
} from "./sounds/SoundManager.js";

const Stack = createStackNavigator();

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const MainApp = () => {
  const { user } = useUser();
  const [isFontLoaded] = useFonts({
    "Alata-Regular": require("./assets/Fonts/Alata-Regular.ttf"),
  });
  useEffect(() => {
    playBackgroundMusic(sounds.homeBackground);
    return () => {
      stopBackgroundMusic();
    };
  }, []);
  return (
    <NavigationContainer>
      {isFontLoaded && (
        <SignedIn>
          <AppNavigator user={user} />
        </SignedIn>
      )}
      {isFontLoaded && (
        <SignedOut>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth">
              {(props) => <AuthScreen {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </SignedOut>
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <MainApp />
    </ClerkProvider>
  );
}
