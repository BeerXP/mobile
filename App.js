import React from "react";
import {
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  COLOR_PRIMARY,
  COLOR_SECONDARY
} from "./src/components/styles/common";

import HomeTab from "./src/components/appTabNavigator/HomeTab";
import ProfileTab from "./src/components/appTabNavigator/ProfileTab";
import SearchTab from "./src/components/appTabNavigator/SearchTab";

// import the different screens
import LoadingScreen from "./src/components/LoadingScreen";
import SignUp from "./src/components/SignUp";
import Login from "./src/components/screens/Login";
import ProfileEditScreen from "./src/components/Profile/ProfileEditScreen";
import FriendsScreen from "./src/components/Friends/FriendsScreen";

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Icons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `home${focused ? '' : '-outline'}`;
    // We want to add badges to home tab icon
    // IconComponent = HomeIconWithBadge;
  } else if (routeName === 'Search') {
    iconName = `magnify${focused ? '' : ''}`;
  } else if (routeName === 'Drinkin') {
    iconName = `plus${focused ? '' : '-outline'}`;
  } else if (routeName === 'Activities') {
    iconName = `beer${focused ? '' : ''}`;
  } else if (routeName === 'Profile') {
    iconName = `account-circle${focused ? '' : '-outline'}`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const ProfileStack = createStackNavigator(
  {
    ProfileHome: {
      screen: ProfileTab,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
        };
      },
    },
    ProfileEdit: {
      screen: ProfileEditScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
        };
      },
    },
    Friends: {
      screen: FriendsScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: true,
          title: 'Amigos',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
        };
      },
    }
  },
  {
    initialRouteName: "ProfileHome"
  }
);

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeTab },
    Search: { screen: SearchTab },
    Drinkin: { screen: SearchTab },
    Activities: { screen: SearchTab },
    Profile: { screen: ProfileStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: COLOR_PRIMARY,
      inactiveTintColor: 'gray',
    },
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