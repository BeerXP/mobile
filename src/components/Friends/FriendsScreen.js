import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import { Avatar, Divider, Card, Button, Icon, Image, Header } from "react-native-elements";
import Icons from 'react-native-vector-icons/FontAwesome';

// import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import {
    COLOR_PRIMARY,
    COLOR_SECONDARY
} from "./../styles/common";

// import Common from './FollowersScreen';
import FollowingScreen from './FollowingScreen';
import FollowersScreen from './FollowersScreen';

import analytics from '@react-native-firebase/analytics';


// const FriendsScreen = ({ navigation }) => {
export default createMaterialTopTabNavigator({

    // return createMaterialTopTabNavigator({
    // Common: {
    //     screen: Common,
    //     navigationOptions: ({ navigation }) => {
    //         return {
    //             headerShown: false,
    //             title: 'Em comum'
    //         };
    //     },
    // },
    Followers: {
        screen: FollowersScreen,
        navigationOptions: ({ navigation }) => {
            const { followersList } = navigation.state.params;
            return {
                headerShown: false,
                title: `${followersList.length} Seguidores`
            };
        },
    },
    Following: {
        screen: FollowingScreen,
        navigationOptions: ({ navigation }) => {
            const { followingList } = navigation.state.params;
            return {
                headerShown: false,
                title: `${followingList.length} Seguindo`
            };
        },
    }
},
    {
        // initialRouteName: 'Followers',
        // backBehavior: 'initialRoute',
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'gray',
            style: { backgroundColor: COLOR_PRIMARY },
            scrollEnabled: true,
        }
    },
)

// };
// export default FriendsScreen;