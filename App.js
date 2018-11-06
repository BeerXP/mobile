import React from "react";
import { StyleSheet, Platform, Image, Text, View } from "react-native";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";

// import the different screens
import Loading from "./src/components/Loading";
import SignUp from "./src/components/SignUp";
import Login from "./src/components/Login";
import FeedScreen from "./src/components/FeedScreen";

const AppStack = createStackNavigator({ FeedScreen: FeedScreen });
const AuthStack = createStackNavigator({
  Login: { screen: Login, title: "Login" },
  SignUp: { screen: SignUp, title: "SignUp" }
});

// create our app's navigation stack
export default createSwitchNavigator(
  {
    Loading: Loading,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "Loading"
  }
);

// export default App;
