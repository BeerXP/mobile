import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Image,
	ImageBackground,
	View,
	Dimensions,
	ScrollView
} from "react-native";

// import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input, SocialIcon, Text } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";

import { AccessToken, LoginManager } from "react-native-fbsdk";

import { firebase } from "@react-native-firebase/auth";
import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";
import database from "@react-native-firebase/database";

import { COLOR_PRIMARY, COLOR_SECONDARY } from "./styles/common";

const { width, height } = Dimensions.get("window");

const Login = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState();
	const [isFacebookLoading, setIsFacebookLoading] = useState(false);

	useEffect(() => {
		analytics().setCurrentScreen("LoginView");
	}, []);

	handleLogin = () => {
		setIsLoading(true);
		// TODO: Firebase stuff...
		auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				//Grava o evento de Login no Analytics
				analytics().logLogin({
					method: "email"
				});
				if (credential) {
					// console.log("default app user ->", credential.user.toJSON());
				}
				// Clear out the fields when the user logs in and hide the progress indicator.
				setEmail("");
				setPassword("");
				//natigate to Main
				navigation.navigate("Main");
			})
			.catch(error => {
				setErrorMessage(error.message);
			})
			.finally(() => setIsLoading(false));
	};

	// Calling the following function will open the FB login dialogue:
	resetPassword = async () => {
		// When waiting for the firebase server show the loading indicator.
		setIsLoading(true);
		// TODO: Firebase stuff...
		auth()
			.sendPasswordResetEmail(email)
			.then(() => {
				// Clear out the fields when the user logs in and hide the progress indicator.
				setPassword("");
			})
			.catch(error => {
				// Leave the fields filled when an error occurs and hide the progress indicator.
				setErrorMessage(error.message);
			})
			.finally(() => setIsLoading(false));
		console.log("resetPassowrd");
	};

	// Calling the following function will open the FB login dialogue:
	facebookLogin = async () => {
		// When waiting for the firebase server show the loading indicator.
		setIsFacebookLoading(true);
		try {
			// Login with permissions
			const result = await LoginManager.logInWithPermissions([
				"public_profile",
				"email"
			]);

			if (result.isCancelled) {
				throw new Error("User cancelled the login process");
			}

			console.log(
				"Login success with permissions: " +
					`${result.grantedPermissions.toString()}`
			);

			// get the access token
			const data = await AccessToken.getCurrentAccessToken();

			if (!data) {
				throw new Error(
					"Something went wrong obtaining the users access token"
				); // Handle this however fits the flow of your app
			}

			// create a new firebase credential with the token
			const credential = firebase.auth.FacebookAuthProvider.credential(
				data.accessToken
			);

			// login with credential
			const currentUser = await auth()
				.signInWithCredential(credential)
				.then(() => {
					setIsFacebookLoading(true);
					//Grava o evento de SignUp Facebook no Analytics
					analytics().logLogin({
						method: "facebook.com"
					});
					analytics().logSignUp({
						method: "facebook.com"
					});

					//Navega para a tela principal
					navigation.navigate("Main");
					// Clear out the fields when the user logs in and hide the progress indicator.
				})
				.catch(error => {
					// Leave the fields filled when an error occurs and hide the progress indicator.
					setErrorMessage(error.message);
				})
				.finally(() => setIsFacebookLoading(false));
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<ImageBackground
			source={require("../assets/background.png")}
			style={{ width: "100%", height: "100%" }}
		>
			<View style={styles.container}>
				<ScrollView>
					<View>
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
									onChangeText={email => setEmail(email)}
									value={email}
								/>
							</View>
							<View style={styles.row}>
								<Input
									secureTextEntry
									placeholder="Senha"
									autoCapitalize="none"
									shake={true}
									leftIcon={{ name: "lock" }}
									onChangeText={password =>
										setPassword(password)
									}
									value={password}
								/>
							</View>

							<View style={styles.row}>
								<View style={styles.cell}>
									<Button
										title="Entrar"
										onPress={handleLogin}
										icon={{
											name: "login",
											type: "material-community"
										}}
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
											colors: [
												COLOR_PRIMARY,
												COLOR_SECONDARY
											],
											start: { x: 0, y: 0.5 },
											end: { x: 1, y: 0.5 }
										}}
									/>
								</View>
								<View style={styles.cell}>
									<Button
										title="Cadastrar"
										icon={{
											name: "account-plus",
											type: "material-community"
										}}
										onPress={() =>
											navigation.navigate("SignUp")
										}
										buttonStyle={{
											height: 45,
											borderColor: "transparent",
											borderWidth: 0,
											borderRadius: 25
										}}
										ViewComponent={LinearGradient}
										linearGradientProps={{
											colors: [
												COLOR_PRIMARY,
												COLOR_SECONDARY
											],
											start: { x: 0, y: 0.5 },
											end: { x: 1, y: 0.5 }
										}}
									/>
								</View>
							</View>
							<View style={{ width: "100%", flexGrow: 1 }}>
								<Button
									title="Esqueci minha senha"
									icon={{
										name: "account-key",
										type: "material-community"
									}}
									onPress={() =>
										navigation.navigate(resetPassword)
									}
									buttonStyle={{
										width: "100%",
										height: 40,
										borderColor: "transparent",
										borderWidth: 0,
										borderRadius: 25
									}}
									ViewComponent={LinearGradient}
									linearGradientProps={{
										colors: [
											COLOR_PRIMARY,
											COLOR_SECONDARY
										],
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
									loading={isFacebookLoading}
									onPress={facebookLogin}
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
						</View>
						{errorMessage && (
							<Text style={{ color: "red" }}>{errorMessage}</Text>
						)}
					</View>
				</ScrollView>
			</View>
		</ImageBackground>
	);
};

const win = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	row: {
		flexDirection: "row",
		flex: 1,
		width: "100%",
		justifyContent: "space-around",
		alignItems: "center",
		alignSelf: "center",
		alignContent: "center",
		flexBasis: 1,
		flexGrow: 1,
		padding: 3
	},
	cell: {
		justifyContent: "space-around",
		alignContent: "space-around",
		padding: 3,
		flexBasis: 0.5,
		flexGrow: 0.5,
		flexShrink: 0.5
	},
	image: {
		alignSelf: "stretch",
		width: win.width - 50
	}
});

export default Login;
