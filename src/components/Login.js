import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  View,
  Dimensions
} from "react-native";

import { Button, Input, SocialIcon } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";

import firebase from "react-native-firebase";

import { COLOR_PRIMARY, COLOR_SECONDARY } from "./styles/common";

export default class Login extends React.Component {
  state = { email: "", password: "", errorMessage: null, loading: false };
  handleLogin = () => {
    this.setState({
      // When waiting for the firebase server show the loading indicator.
      loading: true
    });
    // TODO: Firebase stuff...
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.navigate("Main");
        if (credential) {
          console.log("default app user ->", credential.user.toJSON());
        }
        this.setState({
          // Clear out the fields when the user logs in and hide the progress indicator.
          email: "",
          password: "",
          loading: false
        });
      })
      .catch(error => {
        // Leave the fields filled when an error occurs and hide the progress indicator.
        this.setState({ loading: false });
        this.setState({
          errorMessage: error.message
        });
      });
    console.log("handleLogin");
  };
  render() {
    firebase.analytics().setCurrentScreen("Login");
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
              style={styles.image}
              resizeMode={"contain"}
              source={require("../assets/logo.png")}
              loadingIndicatorSource={require("../assets/loading.gif")}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.row}>
              <Input
                placeholder="E-mail"
                autoCapitalize="none"
                shake={true}
                leftIcon={{ name: "email" }}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </View>
            <View style={styles.row}>
              <Input
                secureTextEntry
                placeholder="Senha"
                autoCapitalize="none"
                shake={true}
                leftIcon={{ name: "lock" }}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Button
                  title="Entrar"
                  icon={{ name: "login", type: "material-community" }}
                  onPress={this.handleLogin}
                  loading={this.state.loading}
                  loadingProps={{ size: "large" }}
                  buttonStyle={{
                    height: 45,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 25
                  }}
                  ViewComponent={LinearGradient}
                  linearGradientProps={{
                    colors: [COLOR_PRIMARY, COLOR_SECONDARY],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 }
                  }}
                />
              </View>
              <View style={styles.cell}>
                <Button
                  title="Cadastrar"
                  icon={{ name: "account-plus", type: "material-community" }}
                  onPress={() => this.props.navigation.navigate("SignUp")}
                  buttonStyle={{
                    height: 45,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 25
                  }}
                  ViewComponent={LinearGradient}
                  linearGradientProps={{
                    colors: [COLOR_PRIMARY, COLOR_SECONDARY],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 }
                  }}
                />
              </View>
            </View>
            <View style={styles.row}>
              <Button
                title="Esqueci minha senha"
                style={{ with: "100%" }}
                icon={{ name: "account-key", type: "material-community" }}
                onPress={() => this.props.navigation.navigate("")}
                buttonStyle={{
                  width: win.width - 50,
                  height: 40,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 25
                }}
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors: [COLOR_PRIMARY, COLOR_SECONDARY],
                  start: { x: 0, y: 0.5 },
                  end: { x: 1, y: 0.5 }
                }}
              />
            </View>
            <View style={styles.row}>
              <SocialIcon
                title="Entrar com o Facebook"
                button
                type="facebook"
                style={{ width: "100%" }}
              />
            </View>
            <View style={styles.row}>
              <SocialIcon
                title="Entrar com o Twitter"
                button
                type="twitter"
                style={{ width: "100%" }}
              />
            </View>
            <View style={styles.row}>
              <SocialIcon
                title="Sign In With Google"
                button
                type="google-plus-official"
                style={{ width: "100%" }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const win = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    padding: 5
  },
  cell: {
    padding: 5,
    flexBasis: 0.5,
    flexGrow: 0.5,
    flexShrink: 0.5,
    alignContent: "space-around",
    justifyContent: "space-around"
  },
  image: {
    alignSelf: "stretch",
    width: win.width - 50
  }
});