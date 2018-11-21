import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import firebase from "react-native-firebase";

class MainScreen extends Component {
  constructor() {
    super();
    firebase.crashlytics().setUserIdentifier(firebase.auth().currentUser.uid);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Main</Text>
        <Button
          onPress={() => this.props.navigation.navigate("Detail")}
          title="Detail Page"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default MainScreen;
