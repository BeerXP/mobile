import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { Avatar, Divider, Card, Button, Icon, Image, Header, ListItem } from "react-native-elements";

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    COLOR_PRIMARY,
    COLOR_SECONDARY
} from "../styles/common";

import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import firestore from '@react-native-firebase/firestore';

const Followers = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user] = useState(auth().currentUser);
    const [errorMessage, setErrorMessage] = useState("");
    const [followersUsers, setFollowersUsers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        analytics().setCurrentScreen("FollowersView");

        setIsLoading(true);

        firestore()
            .collection('Users')
            .doc(user.uid)
            .get()
            .then(doc => {
                setFollowersUsers([]);
                // setFollowers(doc._data.followers);

                setFollowersUsers(doc._data.followers);

                // doc._data.followers.map((follow, i) => {
                //     follow.get()
                //         .then(doc => {
                //             // setFollowersUsers(doc._data);
                //             // followersUsers.push(doc._data);
                //             setFollowersUsers([...followersUsers, doc._data]);
                //             // console.log(followersUsers);
                //         })
                // });
            });

        // followers.map((follow, i) => {
        //     follow.get()
        //         .then(doc => {
        //             users.push(doc._data);
        //         })
        // });

        setIsLoading(false);

    }, []);

    var keyExtractor = (item, index) => index.toString();

    var renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            subtitle={item.email}
            rightIcon={<Icons name="account-minus" color="red" size={32} />}
            bottomDivider
        />
    )

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                backgroundColor={COLOR_PRIMARY}
                leftComponent={{
                    icon: 'arrow-left', type: "material-community", color: '#fff'
                }}
                centerComponent={{ text: user.displayName, style: { color: '#fff' } }}
            >
            </Header>
            <SafeAreaView style={styles.container}>
                {
                    // console.log(followersUsers)
                    followersUsers.map((l, i) => {
                        // l.get()
                        console.log(l);
                    })
                }
            </SafeAreaView>
        </View>
    );

}
export default Followers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});