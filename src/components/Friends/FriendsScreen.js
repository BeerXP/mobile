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

import Common from './Followers';
import Followers from './Followers';
import Followings from './Following';

import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import database from '@react-native-firebase/database';

export default createMaterialTopTabNavigator(
    {
        Common: { screen: Common },
        Followers: { screen: Followers },
        Followings: { screen: Followings }
    },
    {
        initialRouteName: 'Followers',
        backBehavior: 'initialRoute',
        tabBarPosition: 'bottom',
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