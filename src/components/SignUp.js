import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  View,
  Dimensions
} from "react-native";

import { Button, Input } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";

import { COLOR_PRIMARY, COLOR_SECONDARY } from "./styles/common";

import firebase from "react-native-firebase";

export default class SignUp extends React.Component {
  state = { email: "", password: "", errorMessage: null, loading: false };
  handleSignUp = () => {
    // async signup(email, pass) {
    //   try {
    //     await firebase.auth()
    //       .createUserWithEmailAndPassword(email, pass);
    //     console.log("Account created");
    //     // Navigate to the Home page, the user is auto logged in
    //   } catch (error) {
    //     console.log(error.toString())
    //   }
    // }
    // TODO: Firebase stuff...
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebase.auth().currentUser.updateProfile({
          displayName: this.state.name
        });
        this.props.navigation.navigate("Main");
      })
      .catch(error =>
        this.setState({
          errorMessage: error.message
        })
      );
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
              style={styles.image}
              resizeMode={"contain"}
              source={require("../assets/logo.png")}
              loadingIndicatorSource={require("../assets/loading.gif")}
            />
          </View>

          <Input
            placeholder="Nome completo"
            autoCapitalize="words"
            shake={true}
            leftIcon={{ type: "font-awesome", name: "user" }}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
          <Input
            placeholder="E-mail"
            autoCapitalize="none"
            shake={true}
            leftIcon={{ name: "email" }}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <Input
            secureTextEntry
            placeholder="Senha"
            autoCapitalize="none"
            shake={true}
            leftIcon={{ name: "lock" }}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Input
            secureTextEntry
            placeholder="Confirmar senha"
            autoCapitalize="none"
            shake={true}
            leftIcon={{ name: "lock" }}
            onChangeText={password2 => this.setState({ password2 })}
            value={this.state.password2}
          />
          <Button
            title="Registrar"
            onPress={this.handleSignUp}
            style={{ marginTop: 20 }}
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
    alignItems: "stretch"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center"
  },
  image: {
    margin: 20,
    alignSelf: "stretch",
    width: win.width
  }
});
