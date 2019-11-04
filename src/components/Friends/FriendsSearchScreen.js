import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Avatar, Divider, Card, Button, Icon, ListItem, SearchBar } from "react-native-elements";
import Icons from 'react-native-vector-icons/FontAwesome';

import analytics from '@react-native-firebase/analytics';
import database from '@react-native-firebase/database';

const FriendsSearchScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [list, setList] = useState([{
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    }]);


    useEffect(() => {
        analytics().setCurrentScreen("FriendsSearchView");

        // Create reference
        // const ref = database().ref(`/users`);
        // ref.once('value', onSnapshot);

        // onSignIn();

    }, []);

    async function onSignIn() {

        // Create a reference
        const ref = database().ref(`/users`);

        // Fetch the data snapshot
        const snapshot = await ref.once('value');

        console.log('User data: ', snapshot.val());

        // Create our own array of games in order
        snapshot.forEach(user => {
            list.push({
                key: user.uid, // Add custom key for FlatList usage
                ...user,
            });
        });

        setSearch(list);
        setLoading(false);
    }


    // Handle snapshot response
    function onSnapshot(snapshot) {
        const list = [];

        // Create our own array of games in order
        snapshot.forEach(user => {
            list.push({
                key: user.uid, // Add custom key for FlatList usage
                ...user,
            });
        });

        setSearch(list);
        setLoading(false);
    }



    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                placeholder="Pesquisar por nome ou e-mail ... "
                onChangeText={search => setSearch(search)}
                value={search}
                lightTheme={true}
                round={true}
                showLoading={isLoading}
            />
            <View>
                {
                    list.map((l, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: l.avatar_url } }}
                            title={l.name}
                            subtitle={l.subtitle}
                            rightIcon={<Icons name="user-plus" color="green" />}
                            bottomDivider
                        />
                    ))
                }
            </View>
        </SafeAreaView>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        padding: 5
    }
});

export default FriendsSearchScreen;
