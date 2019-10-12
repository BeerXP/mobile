import React from "react";
import { Dimensions } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import SideMenu from "./src/components/SideMenu/SideMenu";
import stackNav from "./src/components/stacknav";

// import the different screens
import LoadingScreen from "./src/components/LoadingScreen";
import SignUp from "./src/components/SignUp";
import Login from "./src/components/Login";

const AppStack = createDrawerNavigator(
  {
    Item1: {
      screen: stackNav
    }
  },
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get("window").width - 80
  }
);

const AuthStack = createStackNavigator(
  {
    Login: { screen: Login, title: "Login" },
    SignUp: { screen: SignUp, title: "SignUp" }
  },
  {
    headerMode: "none"
  }
);

// create our app's navigation stack
const App = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "Auth"
  }
);

export default createAppContainer(App);