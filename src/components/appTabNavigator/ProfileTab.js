import React, { Component } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet
} from "react-native";

const ProfileTab = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Profile!</Text>
            </View>
        </SafeAreaView>
    );

}
export default ProfileTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});