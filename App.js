import React from "react";
import { Dimensions } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import SideMenu from "./src/components/SideMenu/SideMenu";
import stackNav from "./src/components/stacknav";

import HomeTab from "./src/components/appTabNavigator/HomeTab";
import ProfileTab from "./src/components/appTabNavigator/ProfileTab";
import SearchTab from "./src/components/appTabNavigator/SearchTab";

// import the different screens
import LoadingScreen from "./src/components/LoadingScreen";
import SignUp from "./src/components/SignUp";
import Login from "./src/components/screens/Login";

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Icons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `home${focused ? '' : '-outline'}`;
    // We want to add badges to home tab icon
    // IconComponent = HomeIconWithBadge;
  } else if (routeName === 'Search') {
    iconName = `search${focused ? '' : '-outline'}`;
  } else if (routeName === 'Profile') {
    iconName = `account-circle${focused ? '' : '-outline'}`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeTab },
    Search: { screen: SearchTab },
    Profile: { screen: ProfileTab },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: 'darkorange',
      inactiveTintColor: 'gray',
    },
  }
)

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
    App: AppTabNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: "Loading"
  }
);

export default createAppContainer(App);