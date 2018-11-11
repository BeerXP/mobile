import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import * as firebase from "firebase"

class MainScreen extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ loading: false, user });
    });
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
