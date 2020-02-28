import React, {useState, useEffect} from "react";
import {View, SafeAreaView, Text, StyleSheet} from "react-native";
import {Avatar, Divider, Card, Button, Icon, Image, Header} from "react-native-elements";
import Icons from 'react-native-vector-icons/FontAwesome';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {
    COLOR_PRIMARY,
    COLOR_SECONDARY,
} from "../styles/common";

// import Common from './FollowersScreen';
import FollowingScreen from './FollowingScreen';
import FollowersScreen from './FollowersScreen';

import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";
import firestore from "@react-native-firebase/firestore";

const FriendsScreen = ({route, navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user] = useState(auth().currentUser);
    const [errorMessage, setErrorMessage] = useState("");
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

    const {activeTab} = route.params;

    const Tab = createMaterialTopTabNavigator();

    useEffect(() => {
        analytics().setCurrentScreen("ProfileView");

        setIsLoading(true);

        firestore()
            .collection('Users')
            .doc(user.uid)
            .get()
            .then((doc) => {
                setFollowers(doc.data().followers);
                setFollowing(doc.data().following);
            });

        setIsLoading(false);
    }, []);

    return (
        <Tab.Navigator initialRouteName={activeTab}
            tabBarOptions={{
                activeTintColor: COLOR_SECONDARY,
                indicatorStyle: {backgroundColor: COLOR_SECONDARY},
                inactiveTintColor: 'gray',
                scrollEnabled: true,
            }}>
            <Tab.Screen name="Followers" component={FollowersScreen}
                options={{title: `${followers.length} Seguidores`}} initialParams={{followersList: followers}} />
            <Tab.Screen name="Following" component={FollowingScreen}
                options={{title: `${following.length} Seguindo`}} initialParams={{followingList: following}} />
        </Tab.Navigator>
    );
};

export default FriendsScreen;
