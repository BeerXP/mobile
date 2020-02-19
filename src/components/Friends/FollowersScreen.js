import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { Avatar, Divider, Card, Button, Icon, Image, Header, ListItem, SearchBar } from "react-native-elements";

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    COLOR_PRIMARY,
    COLOR_SECONDARY
} from "../styles/common";

import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";
import firestore from "@react-native-firebase/firestore";

const FollowersScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user] = useState(auth().currentUser);
    const [errorMessage, setErrorMessage] = useState("");
    const [followersUsers, setFollowersUsers] = useState([]);

    useEffect(() => {
        analytics().setCurrentScreen("FollowersView");

        setIsLoading(true);
        // setFollowersUsers([]);

        // const { followersList, followingList } = navigation.state.params;

        // followersList.map((item, key) => {
        //     item.get().then(followersUsersList => {
        //         followersUsers.push(followersUsersList.data());
        //     });
        //     // setFollowersUsers(followersUsers);
        //     setIsLoading(false);
        // });

    }, []);

    let renderItem = ({ item }) => (
        <ListItem
            leftAvatar={{ source: { uri: item.photoURL } }}
            title={item.name}
            subtitle={item.email}
            rightIcon={<Icons name="account-plus" color="green" size={32} />}
            bottomDivider
        />
    )

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SearchBar
                placeholder=" "
                // onChangeText={searchName => setSearchName({ searchName })}
                // value={searchName}
                lightTheme={true}
                round={true}
                showLoading={isLoading}
            />
            <SafeAreaView style={styles.container}>
                <FlatList
                    keyExtractor={item => item.uid}
                    data={followersUsers}
                    renderItem={renderItem}
                />
            </SafeAreaView>
        </View>
    );

}
export default FollowersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});