import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  View,
  Dimensions,
} from "react-native";

import {Button, Input} from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";

import {COLOR_PRIMARY, COLOR_SECONDARY} from "./styles/common";

import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";
import database from "@react-native-firebase/database";

const SignUp = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    analytics().setCurrentScreen("SignUpView");
  }, []);

  handleSignUp = () => {
    // TODO: Firebase stuff...
    if (password === password2) {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          auth().currentUser.updateProfile({
            displayName: name,
          });
          // Grava o evento de SignUp no Analytics
          analytics().logSignUp({
            method: 'Email',
          });

          // Navega para tela principal
          navigation.navigate("Main");
        })
        .catch((error) =>
          setErrorMessage(
            error.message,
          ),
        ).finally(() => {
 setIsLoading(false);
});
    } else {
      setErrorMessage("As senhas devem ser iguais");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={{width: "100%", height: "100%"}}
    >
      <View style={styles.container}>
        <View style={{alignSelf: "center"}}>
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
          leftIcon={{type: "font-awesome", name: "user"}}
          onChangeText={(name) => setName(name)}
          value={name}
        />
        <Input
          placeholder="E-mail"
          autoCapitalize="none"
          shake={true}
          leftIcon={{name: "email"}}
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
        <Input
          secureTextEntry
          placeholder="Senha"
          autoCapitalize="none"
          shake={true}
          leftIcon={{name: "lock"}}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
        <Input
          secureTextEntry
          placeholder="Confirmar senha"
          autoCapitalize="none"
          shake={true}
          leftIcon={{name: "lock"}}
          onChangeText={(password2) => setPassword2(password2)}
          value={password2}
        />
        <Button
          title="Registrar"
          onPress={handleSignUp}
          style={{marginTop: 20}}
          loading={isLoading}
          loadingProps={{size: "large"}}
          buttonStyle={{
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 25,
          }}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: [COLOR_PRIMARY, COLOR_SECONDARY],
            start: {x: 0, y: 0.5},
            end: {x: 1, y: 0.5},
          }}
        />
        {errorMessage && (
          <Text style={{color: "red"}}>{errorMessage}</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const win = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignContent: "center",
    alignItems: "stretch",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  image: {
    margin: 20,
    alignSelf: "stretch",
    width: win.width,
  },
});

export default SignUp;
