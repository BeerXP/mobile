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

const FollowersScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user] = useState(auth().currentUser);
    const [errorMessage, setErrorMessage] = useState("");
    const [followersUsers, setFollowersUsers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        analytics().setCurrentScreen("FollowersView");

        setIsLoading(true);

        const { followersList } = navigation.state.params;
        console.log("FollowersList", followersList);

        // // Using an IIFE
        // (async function getFollowers() {

        //     const userDocRef = firestore()
        //         .collection('Users')
        //         .doc(user.uid);

        //     const files = await firebase
        //         .firestore()
        //         .collection('Users')
        //         .where('category', '==', userDocRef)
        //         .get();
        // })

        // Using an IIFE
        (async function getFollowers() {
            const userFriends = await firestore()
                .doc(`Users/${user.uid}`)
                // .collection('followers')
                .get();

            // console.log('Followers', userFriends.get('followers'));

            userFriends.get('followers')
                .then(res => {
                    setUsers([]);

                    // console.log("Seguidores:", res._data);



                    // const unsubscribe = res.data().followers
                    //     // .orderBy('name')
                    //     .onSnapshot((querySnapshot) => {
                    //         // Add users into an array
                    //         const users = querySnapshot.docs.map((documentSnapshot) => {
                    //             return {
                    //                 ...documentSnapshot.data(),
                    //                 key: documentSnapshot.id, // required for FlatList
                    //             };
                    //         });

                    //         // Update state with the users array
                    //         setFollowersUsers(users);

                    //         // As this can trigger multiple times, only update loading after the first update
                    //         if (isLoading) {
                    //             setIsLoading(false);
                    //         }
                    //     });

                    // return () => unsubscribe(); // Stop listening for updates whenever the component unmounts




                    res._data.followers.map((item, key) => {
                        item.get().then(followersUsersList => {
                            users.push(followersUsersList._data);
                        });
                    });
                    setIsLoading(false);
                });;
        })();

        // firestore()
        //     .doc(`Users/${user.uid}`)
        //     .get().then(res => {
        //         res._data.followers.map((item, key) => {
        //             item.get().then(followersUsersList => {
        //                 users.push(followersUsersList._data);
        //             });
        //         });
        //         setIsLoading(false);
        //     });

        // while (isLoading);

        // Update state with the users array
        setFollowersUsers(users);

        // setIsLoading(false);

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
                    followersUsers.map((followUser, i) => (
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