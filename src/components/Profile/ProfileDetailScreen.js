import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar, Divider, Card, Button, Icon } from "react-native-elements";
import Icons from "react-native-vector-icons/FontAwesome";

import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";

const ProfileScreen = ({ route, navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user] = useState(auth().currentUser);

	useEffect(() => {
		analytics().setCurrentScreen("ProfileDetailView");
	}, []);

	return (
		<View style={styles.container}>
			<Card
				style={styles.card}
				title={user.displayName}
				image={{ uri: user.photoURL + "?type=large" }}
				imageProps={{ resizeMode: "cover", resizeMethod: "auto" }}
				loadingIndicatorSource={require("../../assets/homer.png")}
			>
				<Text style={{ marginBottom: 10 }}>
					Name: {user.displayName} {"\n"}
					E-mail: {user.email} {"\n"}
					Photo: {user.photoURL + "?type=large"} {"\n"}
					Token: {firebase.auth.FacebookAuthProvider.credential}{" "}
					{"\n"}
				</Text>
				<Button
					title=" Editar"
					onPress={() => navigation.push("ProfileEdit")}
					icon={
						<Icon name="edit" type="font-awesome" color="#ffffff" />
					}
					backgroundColor="#03A9F4"
					buttonStyle={{
						borderRadius: 0,
						marginLeft: 0,
						marginRight: 0,
						marginBottom: 0
					}}
				/>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		padding: 5
	},
	card: {
		flex: 1,
		justifyContent: "space-around",
		alignContent: "space-between",
		alignItems: "flex-start",
		flexWrap: "wrap",
		flexGrow: 1
	}
});

export default ProfileScreen;
