import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ActivityIndicator
} from "react-native";

import { Avatar, Divider, Card, Button, Input, Icon, Image, Header } from "react-native-elements";

import ImagePicker from 'react-native-image-picker';

import { COLOR_PRIMARY, COLOR_SECONDARY } from "../styles/common";

import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Change Profile Photo',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const ProfileEditScreen = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [user] = useState(auth().currentUser);

  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.photoURL + "?type=large");

  useEffect(() => {
    analytics().setCurrentScreen("ProfileEditView");
  }, []);

  handleBack = () => {
    setIsLoading(false);
    //Volta para tela anterior
    navigation.pop();
  }

  handleUpdate = () => {
    setIsLoading(true);

    user.updateProfile({
      displayName: name,
      email: email,
      photoURL: image
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

  pickImage = () => {
    /**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage(response.uri);

        // const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header
        backgroundColor={COLOR_PRIMARY}
        leftComponent={{ icon: 'close', type: "material-community", color: '#fff', onPress: handleBack }}
        centerComponent={{ text: user.displayName, style: { color: '#fff' } }}
        rightComponent={{ icon: 'check', type: "font-awesome", color: '#fff', onPress: handleUpdate }}>
      </Header>
      <SafeAreaView >
        <View style={{ paddingTop: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Avatar
                size="xlarge"
                rounded
                source={{ uri: image }}
                activeOpacity={0.7}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <Button
              title="Alterar foto"
              loading={isLoading}
              type="clear"
              // icon={{ name: "edit", type: "material-community" }}
              onPress={pickImage}
              containerStyle={{ flex: 3, marginLeft: 10, justifyContent: 'center', height: 40 }}
            />
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <Input
              placeholder="Nome completo"
              autoCapitalize="words"
              shake={true}
              leftIcon={{ type: "font-awesome", name: "user" }}
              onChangeText={name => setName({ name })}
              value={name}
            />
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <Input
              placeholder="E-mail"
              autoCapitalize="none"
              shake={true}
              leftIcon={{ name: "email" }}
              onChangeText={email => setEmail({ email })}
              value={email}
            />
          </View>
        </View>

        {/* <View style={styles.container}>
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
        </View> */}
      </SafeAreaView>
    </View >



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
