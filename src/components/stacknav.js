import React from "react";
import { TouchableOpacity } from "react-native";

import { StackNavigator } from "react-navigation";
import IOSIcon from "react-native-vector-icons/Ionicons";
import MainScreen from "./MainScreen";
import DetailScreen from "./DetailScreen";

const stackNav = StackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Home",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <IOSIcon name="ios-menu" size={50} />
        </TouchableOpacity>
      ),
      headerStyle: { paddingRight: 10, paddingLeft: 15 }
    })
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Detalhes"
    })
  }
});

export default stackNav;
