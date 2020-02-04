import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, Text } from "react-native";
import { Avatar, Divider, Card, Button, Icon, ListItem, SearchBar } from "react-native-elements";

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import analytics from '@react-native-firebase/analytics';
import database from '@react-native-firebase/database';

const SearchTab = ({ navigation, focused, tintColor }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [searchName, setSearchName] = useState("");
    const [list, setList] = useState([]);

    keyExtractor = item => item.id;

    useEffect(() => {
        setIsLoading(true);
        // Create reference
        const ref = database().ref(`/users`);
        ref.once('value', onSnapshot);
        // setIsLoading(false);
    }, [searchName]);

    useEffect(() => {
        analytics().setCurrentScreen("FriendsSearchView");
    }, []);

    // Handle snapshot response
    function onSnapshot(snapshot) {
        const list = [];

        // Create our own array of games in order
        snapshot.forEach(user => {
            list.push({
                key: user.key, // Add custom key for FlatList usage
                ...user.val(),
            });
        });

        setList(list);
        setIsLoading(false);
    }

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
                {
                    // <FlatList
                    //     keyExtractor={keyExtractor}
                    //     data={list}
                    //     renderItem={this.renderItemCustom} />

                    list.map((user, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: user.photoURL } }}
                            title={user.displayName}
                            subtitle={user.email}
                            rightIcon={<Icons name="account-plus" color="green" size={32} />}
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

export default SearchTab;
