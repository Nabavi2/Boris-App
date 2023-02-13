import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../Screens/SearchScreen";
import HistoryScreen from "../Screens/HistoryScreen";
import ActivityMainList from "../Screens/ActivityMainList";
import ArchiveListScreen from "../Screens/ArchiveListScreen";
import Header from "../Components/Header";

const Stack = createNativeStackNavigator();

const AppNavigation = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SearchScreen"
        screenOptions={{ animation: "slide_from_right", headerShown: false }}
      >
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
        <Stack.Screen name="ActivityMainList" component={ActivityMainList} />
        <Stack.Screen name="ArchiveListScreen" component={ArchiveListScreen} />
        <Stack.Screen name="Header" component={Header} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
