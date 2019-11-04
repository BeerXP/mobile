import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import IOSIcon from "react-native-vector-icons/Ionicons";

import MainScreen from "./MainScreen";
import DetailScreen from "./DetailScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import ProfileEditScreen from "./Profile/ProfileEditScreen";
import FriendsScreen from "./Friends/FriendsScreen";

const stackNav = createStackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Home",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <IOSIcon name="ios-menu" size={35} style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      )
    })
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Detalhes",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <IOSIcon name="ios-menu" size={35} style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      )
    })
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Perfil",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <IOSIcon name="ios-menu" size={35} style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      )
    })
  },
  ProfileEdit: {
    screen: ProfileEditScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Edit"
    })
  },
  Friends: {
    screen: FriendsScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Amigos"
    })
  }
});

export default stackNav;
