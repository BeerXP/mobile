import React from "react";
import { TouchableOpacity } from "react-native";
import { StackNavigator } from "react-navigation";
import IOSIcon from "react-native-vector-icons/Ionicons";
import MainScreen from "./MainScreen";
import DetailScreen from "./DetailScreen";
import ProfileScreen from "./ProfileScreen";

const stackNav = StackNavigator({
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
      title: "Detalhes"
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
  }
});

export default stackNav;
