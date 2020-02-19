import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import { Avatar, Divider, Card, Button, Icon, Image, Header } from "react-native-elements";
import Icons from 'react-native-vector-icons/FontAwesome';

// import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import {
    COLOR_PRIMARY,
    COLOR_SECONDARY
} from "../styles/common";

// import Common from './FollowersScreen';
import FollowingScreen from './FollowingScreen';
import FollowersScreen from './FollowersScreen';

import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";
import firestore from "@react-native-firebase/firestore";



function getFollowers() {
    firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .get()
        .then(doc => {
            console.log("Followers:", doc.data().followers.length);
            return doc.data().followers.length;
        });
}

const FriendsScreen = createMaterialTopTabNavigator({
    // export default createMaterialTopTabNavigator({

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
            // console.log("Navigation Followers:", navigation.state.params);
            // const { followersList, followingList } = navigation.state.params;
            return {
                headerShown: false,
                title: `${getFollowers()} Seguidores`
            };
        },
    },
    Following: {
        screen: FollowingScreen,
        navigationOptions: ({ navigation }) => {
            console.log("Navigation Folowing:", navigation.state.params);
            // const { followingList, followersList } = navigation.state.params;
            return {
                headerShown: false,
                // title: `${followingList.length} Seguindo`
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
);

export default FriendsScreen;
