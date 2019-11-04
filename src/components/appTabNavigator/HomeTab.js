import React, { Component } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet
} from "react-native";

const HomeTab = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        </SafeAreaView>
    );

}
export default HomeTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});