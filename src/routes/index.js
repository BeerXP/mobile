import React from "react";
import {Dimensions} from "react-native";
import {createDrawerNavigator} from "react-navigation-drawer";

import Drawer from "./../components/Drawer";
import ProfileScreen from "../components/Profile/ProfileScreen";

const DEVICE_WIDTH = Dimensions.get("window").width;

export default createDrawerNavigator(
  {
    Screen1: {
      screen: ProfileScreen,
    },
  },
  {
    drawerWidth: DEVICE_WIDTH - 100,
    contentComponent: (props) => <Drawer {...props} />,
  },
);
