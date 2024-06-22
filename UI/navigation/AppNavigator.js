import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ExerciseScreen from "../screens/ExerciseScreen/ExerciseScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";

const Stack = createStackNavigator();

function AppNavigator({ user }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home">
        {(props) => <HomeScreen {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen name="Exercise" component={ExerciseScreen} />
      <Stack.Screen name="Profile">
        {(props) => <ProfileScreen {...props} user={user} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default AppNavigator;
