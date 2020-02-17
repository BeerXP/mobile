import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import { NavigationActions } from "react-navigation";
import {
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  ImageBackground
} from "react-native";
import { Button, Icon, Avatar } from "react-native-elements";
import styles from "./SideMenu.style";

import auth from '@react-native-firebase/auth';
import firebase from "@react-native-firebase/app";

const SideMenu = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  handleLogout = () => {
    // TODO: Firebase stuff...
    auth()
      .signOut()
      .then(() => this.props.navigation.navigate("Loading"))
      .catch(error => setErrorMessage(error.message));

    // console.log("handleLogin");
  };

  // navigateToScreen = route => () => {
  //   const navigateAction = NavigationActions.navigate({
  //     routeName: route,
  //     action: NavigationActions.navigate({ routeName: route })
  //   });
  //   this.props.navigation.dispatch(navigateAction);
  // };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          style={{ width: "100%" }}
          resizeMode="cover"
          source={require("./../../assets/banner.jpg")}
          loadingIndicatorSource={require("./../../assets/loading.gif")}
        >
          <View style={styles.headerContainer}>
            <Avatar
              size="xlarge"
              rounded
              source={{
                uri: auth().currentUser.photoURL + "?type=large"
              }}
              onPress={() => navigation.navigate("Profile")}
              activeOpacity={0.7}
            />
            <Text style={styles.headerDisplay}>
              {auth().currentUser.displayName}
            </Text>
            <Text style={styles.headerDisplay}>
              {auth().currentUser.email}
            </Text>
          </View>
        </ImageBackground>
        <View>
          <Text style={styles.sectionHeadingStyle}>Home</Text>
          <View style={styles.navSectionStyle}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Main")}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon name="home" type="material-community" />
                <Text style={styles.navItemStyle}>Home</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.sectionHeadingStyle}>Lista</Text>
          <View style={styles.navSectionStyle}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="beer" type="font-awesome" />
                <Text
                  style={styles.navItemStyle}
                >
                  Minhas cervejas
                  </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="bookmark" type="font-awesome" />
                <Text
                  style={styles.navItemStyle}
                >
                  Minhas lista de desejos
                  </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.sectionHeadingStyle}>Amigos</Text>
          <View style={styles.navSectionStyle}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon name="account-circle" type="material-community" />
                <Text style={styles.navItemStyle}>Perfil</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Friends")}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon name="account-group" type="material-community" />
                <Text style={styles.navItemStyle}>Amigos</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Button
          raised
          icon={{ name: "sign-out", type: "font-awesome" }}
          onPress={handleLogout}
          title=" Logout"
        />
      </View>
    </SafeAreaView>
  );
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
