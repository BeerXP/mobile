import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar, Divider, Card, Button, Icon } from "react-native-elements";

import firebase from "react-native-firebase";
import { AccessToken, LoginManager } from "react-native-fbsdk";

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
          style={styles.card}
          title={firebase.auth().currentUser.displayName}
          image={{ uri: firebase.auth().currentUser.photoURL + "?type=large" }}
          imageProps={{ resizeMode: "cover", resizeMethod: "auto" }}
        >
          <Text style={{ marginBottom: 10 }}>
            E-mail: {firebase.auth().currentUser.email} {"\n"}
            Photo: {firebase.auth().currentUser.photoURL + "?type=large"} {"\n"}
            Token: {firebase.auth.FacebookAuthProvider.credential} {"\n"}
          </Text>
          <Button
            // disabled={AccessToken.getCurrentAccessToken != null}
            title="Editar"
            icon={<Icon name="edit" color="#ffffff" />}
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
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5
  },
  card: {
    flex: 1,
    justifyContent: "space-around",
    alignContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    flexGrow: 1
  }
});

export default ProfileScreen;
