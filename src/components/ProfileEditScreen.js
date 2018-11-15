import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  Avatar,
  Divider,
  Card,
  Button,
  Icon,
  FormInput
} from "react-native-elements";

import firebase from "react-native-firebase";

class ProfileScreen extends Component {
  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProfileScreen;
