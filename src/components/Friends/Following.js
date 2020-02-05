import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from "react-native";
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
    const [following, setFollowing] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);

    var usersCollection = firestore().collection('Users');

    useEffect(() => {
        analytics().setCurrentScreen("FollowingView");

        setIsLoading(true);


        const unsubscribe = usersCollection
            .onSnapshot((querySnapshot) => {
                // Add users into an array
                const users = querySnapshot.docs.map((documentSnapshot) => {
                    return {
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id, // required for FlatList
                    };
                });
            });

        return () => unsubscribe(); // Stop listening for updates whenever the component unmounts



        usersCollection.doc(user.uid)
            .get()
            .then(doc => {
                setFollowing(doc._data.following);

                // map
                doc._data.following.map((userData) => {
                    console.log(userData);

                    //     usersCollection.doc(userData)
                    //         .get()
                    //         .then(doc => {
                    //             console.log(doc._data);
                    //             setFollowingUsers(doc._data);
                    //         })
                });
            });


        setIsLoading(false);

    }, []);

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
                    followingUsers.map((user, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: user.photoURL } }}
                            title={user.name}
                            subtitle={user.email}
                            rightIcon={<Icons name="account-plus" color="green" size={32} />}
                            bottomDivider
                        />
                    ))
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