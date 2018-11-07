import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./SideMenu.style";
import { NavigationActions } from "react-navigation";
import { TouchableOpacity, ScrollView, Text, View, Image } from "react-native";
import { Button, Icon } from "react-native-elements";

import * as firebase from "firebase";

class SideMenu extends Component {
  state = { email: "", password: "", errorMessage: null };
  handleLogout = () => {
    // TODO: Firebase stuff...
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate("Loading"))
      .catch(error => this.setState({ errorMessage: error.message }));

    console.log("handleLogin");
  };
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
            source={require("./../../assets/banner.jpg")}
            loadingIndicatorSource={require("./../../assets/loading.gif")}
          />
          <View>
            <Text style={styles.sectionHeadingStyle}>Feed</Text>
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen("Page1")}
              >
                Page1
              </Text>
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
                    onPress={this.navigateToScreen("MyBeers")}
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
                    onPress={this.navigateToScreen("MyBeers")}
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
                onPress={() => this.navigateToScreen("ProfileScreen")}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon name="account-circle" type="material-community" />
                  <Text style={styles.navItemStyle}>Perfil</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <View style={{ flexDirection: "row" }}>
                  <Icon name="account-group" type="material-community" />
                  <Text
                    style={styles.navItemStyle}
                    onPress={this.navigateToScreen("Friends")}
                  >
                    Amigos
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Button
            raised
            icon={{ name: "logout", type: "material-community" }}
            onPress={this.handleLogout}
            title="Logout"
          />
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
