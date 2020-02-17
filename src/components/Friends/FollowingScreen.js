import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { Avatar, Divider, Card, Button, Icon, Image, Header, ListItem, SearchBar } from "react-native-elements";

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    COLOR_PRIMARY,
    COLOR_SECONDARY
} from "../styles/common";

import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import firestore from '@react-native-firebase/firestore';

const Following = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user] = useState(auth().currentUser);
    const [errorMessage, setErrorMessage] = useState("");
    const [followingUsers, setFollowingUsers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        analytics().setCurrentScreen("FollowingView");

        setIsLoading(true);

        firestore()
            .collection('Users')
            .doc(user.uid)
            .get()
            .then(doc => {
                setUsers([]);
                setUsers(doc._data.following);
            });

        // console.log(users);

        let aux = []

        users.forEach(function (key, index) {
            // setFollowersUsers(...followingUsers, key.get())
            key.get().then(res => {
                // console.log(res._data);
                aux.push(res._data);
            });

        });

        setFollowingUsers(aux);
        // console.log(followingUsers);

        setIsLoading(false);

    }, []);

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
                {
                    followingUsers.map((followUser, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: followUser.photoURL } }}
                            title={followUser.name}
                            subtitle={followUser.email}
                            rightIcon={<Icons name="account-plus" color="green" size={32} />}
                            bottomDivider
                        />
                    ))
                }
            </SafeAreaView>
        </View >
    );

}
export default Following;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});