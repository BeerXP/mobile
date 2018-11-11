import React from "react";
import { Dimensions } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  DrawerNavigator,
  DrawerItems
} from "react-navigation";

import SideMenu from "./src/components/SideMenu/SideMenu";
import stackNav from "./src/components/stacknav";

// import the different screens
import Loading from "./src/components/Loading";
import SignUp from "./src/components/SignUp";
import Login from "./src/components/Login";
// import ProfileScreen from "./src/components/ProfileScreen";
// import MainScreen from "./src/components/MainScreen";
// import NotificationsScreen from "./src/components/NotificationsScreen";

// import Drawer from "./src/components/Drawer";

// const DEVICE_WIDTH = Dimensions.get("window").width;

// const AppStack = createDrawerNavigator(
//   {
//     Screen1: {
//       screen: ProfileScreen
//     }
//   },
//   {
//     drawerWidth: DEVICE_WIDTH - 100,
//     contentComponent: props => <Drawer {...props} />
//   }
// );

// const AppStack_old2 = DrawerNavigator(
//   {
//     Home: {
//       screen: MainScreen
//     },
//     Notifications: {
//       screen: NotificationsScreen
//     }
//   },
//   {
//     contentComponent: props => (
//       <View>
//         <Text>Custom Header</Text>
//         <DrawerItems {...props} />
//         <Text>Custom Footer</Text>
//       </View>
//     )
//   }
// );

const AppStack = DrawerNavigator(
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

// export default createDrawerNavigator(
//   {
//     Screen1: {
//       screen: ProfileScreen
//     }
//   },
//   {
//     drawerWidth: DEVICE_WIDTH - 100,
//     contentComponent: props => <Drawer {...props} />
//   }
// );

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
