import React from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TextInput,
  View
} from "react-native";

import * as firebase from "firebase";

import { Icon, Button, SocialIcon } from "react-native-elements";

export default class Login extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleLogin = () => {
    // TODO: Firebase stuff...
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("Main"))
      .catch(error => this.setState({ errorMessage: error.message }));
    console.log("handleLogin");
  };
  render() {
    return (
      <ImageBackground
        source={require("../assets/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          {this.state.errorMessage && (
            <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
          )}
          <View style={{ alignSelf: "center" }}>
            <Image
              resizeMode="center"
              source={require("../assets/logo.png")}
              loadingIndicatorSource={require("../assets/loading.gif")}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.row}>
              <Icon style={{ marginRight: 10 }} name="email" type="entypo" />
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </View>
            <View style={styles.row}>
              <Icon name="lock" type="material-community" />
              <TextInput
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </View>
            <View style={styles.row}>
              <Button
                title="Entrar"
                icon={{ name: "login", type: "material-community" }}
                onPress={this.handleLogin}
              />
              <Button
                title="Cadastrar"
                containerViewStyle={{ alignSelf: "stretch" }}
                icon={{ name: "account-plus", type: "material-community" }}
                onPress={() => this.props.navigation.navigate("SignUp")}
              />
            </View>
            <View style={styles.row}>
              <SocialIcon
                title="Entrar com o Facebook"
                button
                type="facebook"
                containerViewStyle={{ width: "100%" }}
              />
            </View>
            <View style={styles.row}>
              <SocialIcon
                title="Sign In With Google"
                button
                type="google-plus-official"
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignContent: "center",
    alignItems: "stretch"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    // borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 8
  }
});
