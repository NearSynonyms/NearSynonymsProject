import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import GameScreen from "../screens/GameScreen/GameScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import LearnScreen from "../screens/LearnScreen/LearnScreen";

const Stack = createStackNavigator();

function AppNavigator({ user }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home">
        {(props) => <HomeScreen {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen name="Game">
        {(props) => <GameScreen {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen name="Profile">
        {(props) => <ProfileScreen {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen name="Learn">
        {(props) => <LearnScreen {...props} user={user} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default AppNavigator;
