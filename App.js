import { Dimensions } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  DrawerNavigator
} from "react-navigation";

import SideMenu from "./src/components/SideMenu/SideMenu";
import stackNav from "./src/components/stacknav";

// import the different screens
import Loading from "./src/components/Loading";
import SignUp from "./src/components/SignUp";
import Login from "./src/components/Login";

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
