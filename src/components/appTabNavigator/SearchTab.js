import React, { useState, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, FlatList, Text } from "react-native";
import { Avatar, Divider, Card, Button, Icon, ListItem, SearchBar } from "react-native-elements";

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import analytics from "@react-native-firebase/analytics";
import firestore from "@react-native-firebase/firestore";

const SearchTab = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [searchName, setSearchName] = useState("");
    const [list, setList] = useState([]);

    useEffect(() => {
        analytics().setCurrentScreen("FriendsSearchView");


    }, []);

    useEffect(() => {
        setIsLoading(true);

        const unsubscribe = firestore()
            .collection('Users')
            // .where('name', '>=', searchName)
            .orderBy('name')
            .onSnapshot((querySnapshot) => {
                // Add users into an array
                const users = querySnapshot.docs.map((documentSnapshot) => {
                    return {
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id, // required for FlatList
                    };
                });

                // Update state with the users array
                setList(users);

                // As this can trigger multiple times, only update loading after the first update
                if (isLoading) {
                    setIsLoading(false);
                }
            });

        return () => unsubscribe(); // Stop listening for updates whenever the component unmounts

    }, [searchName]);

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
        <SafeAreaView style={styles.container}>
            <SearchBar
                placeholder="Pesquisar por nome ou e-mail ... "
                onChangeText={searchName => setSearchName({ searchName })}
                value={searchName}
                lightTheme={true}
                round={true}
                showLoading={isLoading}
            />
            <View>
                <FlatList
                    keyExtractor={item => item.id}
                    data={list}
                    renderItem={renderItem}
                />
                {/* {
                    list.map((user, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: user.photoURL } }}
                            title={user.name}
                            subtitle={user.email}
                            rightIcon={<Icons name="account-plus" color="green" size={32} />}
                            bottomDivider
                        />
                    ))
                } */}
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

export default SearchTab;
