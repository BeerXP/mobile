import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import { COLOR_PRIMARY, COLOR_SECONDARY } from "./src/components/styles/common";

import HomeTab from "./src/components/appTabNavigator/HomeTab";
import ProfileTab from "./src/components/appTabNavigator/ProfileTab";
import SearchTab from "./src/components/appTabNavigator/SearchTab";

// import the different screens
import LoadingScreen from "./src/components/LoadingScreen";
import SignUp from "./src/components/SignUp";
import Login from "./src/components/screens/Login";
import ProfileEditScreen from "./src/components/Profile/ProfileEditScreen";
import FriendsScreen from "./src/components/Friends/FriendsScreen";

const getTabBarIcon = (route, focused, tintColor) => {
	let routeName = route.name;
	let IconComponent = Icons;
	let iconName;
	if (routeName === "Home") {
		iconName = `home${focused ? "" : "-outline"}`;
	} else if (routeName === "Search") {
		iconName = `magnify${focused ? "" : ""}`;
	} else if (routeName === "Drinkin") {
		iconName = `plus${focused ? "" : "-outline"}`;
	} else if (routeName === "Activities") {
		iconName = `beer${focused ? "" : ""}`;
	} else if (routeName === "Profile") {
		iconName = `account-circle${focused ? "" : "-outline"}`;
	}

	// You can return any component that you like here!
	return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const ProfileStack = createStackNavigator();

function ProfileStackFunc() {
	return (
		<ProfileStack.Navigator initialRouteName="ProfileHome">
			<ProfileStack.Screen
				name="ProfileHome"
				component={ProfileTab}
				options={{ headerShown: false }}
			/>
			<ProfileStack.Screen
				name="ProfileEdit"
				component={ProfileEditScreen}
				options={{ headerShown: false }}
			/>
			<ProfileStack.Screen
				name="Friends"
				component={FriendsScreen}
				options={{
					headerShown: true,
					headerBackTitle: "Profile",
					headerTitle: "Amigos",
					headerTintColor: "white",
					headerStyle: {
						backgroundColor: COLOR_PRIMARY
					}
				}}
			/>
		</ProfileStack.Navigator>
	);
}

// const ProfileStack = createStackNavigator(
//   {
//     ProfileHome: {
//       screen: ProfileTab,
//       navigationOptions: ({ navigation }) => {
//         return {
//           headerShown: false,
//         };
//       },
//     },
//     ProfileEdit: {
//       screen: ProfileEditScreen,
//       navigationOptions: ({ navigation }) => {
//         return {
//           headerShown: false,
//         };
//       },
//     },
// Friends: {
//   screen: FriendsScreen,
//   navigationOptions: ({ navigation }) => {
//     return {
//       headerShown: true,
//       headerBackTitle: "Profile",
//       headerTitle: "Amigos",
//       headerTintColor: 'white',
//       headerStyle: {
//         backgroundColor: COLOR_PRIMARY,
//       },
//     };
//   },
// }
//   },
//   {
//     initialRouteName: "ProfileHome"
//   }
// );

const AppTabNavigator = createBottomTabNavigator();

function AppTabs() {
	return (
		<AppTabNavigator.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color }) => {
					return getTabBarIcon(route, focused, color);
				}
			})}
			tabBarOptions={{
				activeTintColor: COLOR_PRIMARY,
				inactiveTintColor: "gray"
			}}
		>
			<AppTabNavigator.Screen name="Home" component={HomeTab} />
			<AppTabNavigator.Screen name="Search" component={SearchTab} />
			<AppTabNavigator.Screen name="Drinkin" component={SearchTab} />
			<AppTabNavigator.Screen name="Activities" component={SearchTab} />
			<AppTabNavigator.Screen
				name="Profile"
				component={ProfileStackFunc}
			/>
		</AppTabNavigator.Navigator>
	);
}

//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, tintColor }) =>
//         getTabBarIcon(navigation, focused, tintColor),
//     }),
//     tabBarOptions: {
//       activeTintColor: COLOR_PRIMARY,
//       inactiveTintColor: 'gray',
//     },
//   }
// );

const AuthStack = createStackNavigator();

function AuthStackFunc() {
	return (
		<AuthStack.Navigator initialRouteName="Loading">
			<AuthStack.Screen name="Login" component={Login} />
			<AuthStack.Screen name="SignUp" component={SignUp} />
		</AuthStack.Navigator>
	);
}

// create our app's navigation stack
const AppStack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<AppStack.Navigator initialRouteName="Loading" headerMode="false">
				<AppStack.Screen name="Loading" component={LoadingScreen} />
				<AppStack.Screen name="App" component={AppTabs} />
				{/* <AppStack.Screen name="Auth" component={AuthStackFunc} /> */}
			</AppStack.Navigator>
		</NavigationContainer>
	);
}
