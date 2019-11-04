import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { Avatar, Divider, Card, Button, Icon, ListItem, SearchBar } from "react-native-elements";
import Icons from 'react-native-vector-icons/FontAwesome';

import analytics from '@react-native-firebase/analytics';
import database from '@react-native-firebase/database';

const FriendsScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Icons name="sign-out" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    }
});

export default FriendsScreen;