import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar, Divider, Card, Button, Icon } from "react-native-elements";

import firebase from "react-native-firebase";
import { AccessToken, LoginManager } from "react-native-fbsdk";

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      loading: false,
      user: firebase.auth().currentUser
    };
  }

  onChange(state) {
    this.setState(state);
  }

  componentDidMount() {
    firebase.auth().onUserChanged(user => {
      this.setState({ loading: false, user: user });
    });
  }

  componentWillUnmount() {
    this.state = { loading: false, user: firebase.auth().currentUser };
  }

  render() {
    return (
      <View style={styles.container}>
        <Card
          style={styles.card}
          title={this.state.user.displayName}
          image={{ uri: firebase.auth().currentUser.photoURL + "?type=large" }}
          imageProps={{ resizeMode: "cover", resizeMethod: "auto" }}
        >
          <Text style={{ marginBottom: 10 }}>
            Name: {this.state.user.displayName} {"\n"}
            E-mail: {this.state.user.email} {"\n"}
            Photo: {this.state.user.photoURL + "?type=large"} {"\n"}
            Token: {firebase.auth.FacebookAuthProvider.credential} {"\n"}
          </Text>
          <Button
            title="Editar"
            onPress={() => this.props.navigation.push("ProfileEdit")}
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
