import React, { useState, useEffect } from 'react';
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

import { COLOR_PRIMARY, COLOR_SECONDARY } from "../styles/common";

import firebase from "@react-native-firebase/app";
import analytics from '@react-native-firebase/analytics';

const ProfileEditScreen = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [user] = useState(firebase.auth().currentUser);

  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    analytics().setCurrentScreen("ProfileEditView");
  }, []);


  // constructor(props) {
  //   super(props);
  //   this.onChange = this.onChange.bind(this);

  //   this.state = {
  //     loading: false,
  //     name: firebase.auth().currentUser.displayName,
  //     email: firebase.auth().currentUser.email,
  //     user: firebase.auth().currentUser
  //   };
  // }

  // onChange(state) {
  //   this.setState(state);
  // }

  // componentDidMount() {
  //   firebase.auth().onUserChanged(user => {
  //     this.setState({ loading: false, user: user });
  //   });
  // }

  handleUpdate = () => {
    setIsLoading(true);

    user
      .updateProfile({
        displayName: name,
        email: email
      })
      .then(() => {
        // Update successful.
        setIsLoading(false);
        //Volta para tela anterior
        navigation.pop();
      })
      .catch(() => {
        // An error happened.
        setIsLoading(false);
      });
  };


  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View style={{ alignSelf: "center" }}>
          <Image
            style={styles.image}
            resizeMode={"contain"}
            source={require("../../assets/logo.png")}
            loadingIndicatorSource={require("../../assets/loading.gif")}
          />
        </View>
        <View style={styles.row}>
          <Input
            placeholder="Nome completo"
            autoCapitalize="words"
            shake={true}
            leftIcon={{ type: "font-awesome", name: "user" }}
            onChangeText={name => setName({ name })}
            value={name}
          />
        </View>
        <View style={styles.row}>
          <Input
            placeholder="E-mail"
            autoCapitalize="none"
            shake={true}
            leftIcon={{ name: "email" }}
            onChangeText={email => setEmail({ email })}
            value={email}
          />
        </View>
        <View style={styles.row}>
          <Button
            title="Salvar"
            onPress={handleUpdate}
            // style={{ marginTop: 20 }}
            icon={{ name: "save", type: "material-community" }}
            loading={isLoading}
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
      </View>
    </ImageBackground>
  );
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
    flexGrow: 1,
    justifyContent: "space-around",
    alignSelf: "center",
    padding: 5
  },
  image: {
    margin: 20,
    alignSelf: "stretch",
    width: win.width
  }
});

export default ProfileEditScreen;
