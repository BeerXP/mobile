import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList, StyleSheet } from "react-native";
import {
	Avatar,
	Divider,
	Card,
	Button,
	Icon,
	Image,
	Header,
	ListItem,
	SearchBar
} from "react-native-elements";

import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import { COLOR_PRIMARY, COLOR_SECONDARY } from "../styles/common";

import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";
import firestore from "@react-native-firebase/firestore";

const FollowingScreen = ({ route, navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user] = useState(auth().currentUser);
	const [errorMessage, setErrorMessage] = useState("");
	const [followingUsers, setFollowingUsers] = useState([]);

	useEffect(() => {
		analytics().setCurrentScreen("FollowingView");
	}, []);

	useEffect(() => {
		console.log("Following");
		setIsLoading(true);
		// setFollowingUsers([]);
		firestore()
			.collection("Users")
			.doc(user.uid)
			// .orderBy("name")
			.get()
			.then(doc => {
				doc.data().following.map((item, key) => {
					item.get().then(followingUserList => {
						followingUsers.push(followingUserList.data());
					});
					setFollowingUsers(followingUsers);
					setIsLoading(false);
				});
			});
	}, [followingUsers]);

	removeFollower = item => {
		let friend = firestore().doc(`Users/${item.uid}`);

		firestore()
			.collection("Users")
			.doc(user.uid)
			.update({
				following: firestore.FieldValue.arrayRemove(friend)
			});

		// setFollowingUsers([]);
	};

	let renderItem = ({ item }) => (
		<ListItem
			leftAvatar={{ source: { uri: item.photoURL } }}
			title={item.name}
			subtitle={item.email}
			rightIcon={
				<Icons
					name="account-minus"
					color="red"
					size={32}
					onPress={() => removeFollower(item)}
				/>
			}
			bottomDivider
		/>
	);

	return (
		<View style={{ flex: 1, backgroundColor: "white" }}>
			<SearchBar
				placeholder=" "
				// onChangeText={searchName => setSearchName({ searchName })}
				// value={searchName}
				lightTheme={true}
				round={true}
				showLoading={isLoading}
			/>
			<SafeAreaView style={styles.container}>
				<FlatList
					keyExtractor={item => item.uid}
					data={followingUsers}
					renderItem={renderItem}
				/>
			</SafeAreaView>
		</View>
	);
};
export default FollowingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white"
	}
});
