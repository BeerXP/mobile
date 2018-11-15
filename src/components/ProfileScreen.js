import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar, Divider, Card, Button, Icon } from "react-native-elements";

import firebase from "react-native-firebase";

class ProfileScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ loading: false, user });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Card
          title={firebase.auth().currentUser.displayName}
          image={firebase.auth().currentUser.photoURL}
        >
          <Text style={{ marginBottom: 10 }}>
            E-mail: {firebase.auth().currentUser.email}
          </Text>
          <Button
            title="VIEW NOW"
            icon={<Icon name="code" color="#ffffff" />}
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
          />
        </Card>
      </View>
    );
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
