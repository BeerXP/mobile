import React, { Component } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Avatar, Divider, Card, Button, Icon, ListItem, SearchBar } from "react-native-elements";
import Icons from 'react-native-vector-icons/FontAwesome';

// import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";

class MainScreen extends Component {
  constructor() {
    super();
    analytics().setUserId(auth().currentUser.uid);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>

      </SafeAreaView>
    );
  }
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});