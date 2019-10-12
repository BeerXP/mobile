import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import auth from '@react-native-firebase/auth';

const LoadingScreen = () => {

  // Set an initilizing state whilst Firebase connects
  const [initilizing, setInitilizing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initilizing) setInitilizing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initilizing) return null;

  // this.props.navigation.navigate(user ? "Main" : "Login");
  this.props.navigation.navigate("Login");

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LoadingScreen;