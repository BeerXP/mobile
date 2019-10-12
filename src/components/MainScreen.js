import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

// import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';

// Import para evitar o erro
import "core-js/es6/map";
import "core-js/es6/symbol";
import "core-js/fn/symbol/iterator";
// Import para evitar o erro

class MainScreen extends Component {
  constructor() {
    super();
    analytics().setUserId(auth().currentUser.uid);
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
