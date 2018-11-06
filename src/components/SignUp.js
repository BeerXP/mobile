import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  TextInput,
  View
} from "react-native";

import {
  Icon,
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";

import * as common from "./styles/common";
import * as firebase from "firebase";

export default class SignUp extends React.Component {
  state = { email: "", password: "", errorMessage: null };
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
      .then(() => this.props.navigation.navigate("FeedScreen"))
      .catch(error => this.setState({ errorMessage: error.message }));
    firebase.console.log("handleSignUp");
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
          <FormLabel>Nome</FormLabel>
          <FormInput ref={input => (this.input = input)} />
          <FormValidationMessage>
            {"This field is required"}
          </FormValidationMessage>
          <FormLabel>Sobrenome</FormLabel>
          <FormInput ref={input => (this.input = input)} />
          <FormLabel>E-mail</FormLabel>
          <FormInput ref={email => (this.email = email)} />
          <FormLabel>Data de Nascimento</FormLabel>
          <FormInput ref={input => (this.input = input)} />
          <FormLabel>Senha</FormLabel>
          <FormInput ref={password => (this.password = password)} />
          <FormValidationMessage>
            {"This field is required"}
          </FormValidationMessage>
          <FormLabel>Confirme a senha</FormLabel>
          <FormInput ref={input => (this.input = input)} />
          <FormValidationMessage>
            {"This field is required"}
          </FormValidationMessage>

          <Button title="Registrar" onPress={this.handleSignUp} />
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
