import React, {useState, useEffect} from "react";
import {
	TouchableOpacity,
	SafeAreaView,
	View,
	Text,
	StyleSheet,
} from "react-native";

import {
	Avatar,
	Divider,
	Card,
	Button,
	Icon,
	Image,
	Header,
} from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";

import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import {COLOR_PRIMARY, COLOR_SECONDARY} from "./../styles/common";

import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";
import firestore from "@react-native-firebase/firestore";

const ProfileTab = ({navigation}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user] = useState(auth().currentUser);
	const [errorMessage, setErrorMessage] = useState("");
	const [following, setFollowing] = useState([]);
	const [followers, setFollowers] = useState([]);
	const [drinkins, setDrinkins] = useState([]);

	useEffect(() => {
		analytics().setCurrentScreen("ProfileView");

		setIsLoading(true);

		firestore()
			.collection("Users")
			.doc(user.uid)
			.get()
			.then((doc) => {
				setFollowers(doc.data().followers);
				setFollowing(doc.data().following);
				setDrinkins(doc.data().drinkins);
			});

		setIsLoading(false);
	}, []);

	// handleLogout = () => {
	//     auth()
	//         .signOut()
	//         .then(() => navigation.navigate("Loading"))
	//         .catch(error => setErrorMessage(error.message));
	// };

	return (
		<View style={{flex: 1, backgroundColor: "white"}}>
			<Header
				backgroundColor={COLOR_PRIMARY}
				leftComponent={{
					icon: "account-plus",
					type: "material-community",
					color: "#fff",
				}}
				centerComponent={{
					text: user.displayName,
					style: {color: "#fff"},
				}}
				rightComponent={{
					icon: "sign-out",
					type: "font-awesome",
					color: "#fff",
					// onPress: handleLogout
				}}
			></Header>
			<SafeAreaView>
				<View style={{paddingTop: 10}}>
					<View style={{flexDirection: "row"}}>
						<View style={{flex: 1, alignItems: "center"}}>
							<Avatar
								size="large"
								rounded
								source={
									user.photoURL ?
										{uri: user.photoURL} :
										require("./../../assets/homer.png")
								}
								activeOpacity={0.7}
							/>
						</View>
						<View style={{flex: 3}}>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-around",
								}}
							>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate("Common", {
											count: "0",
										})
									}
								>
									<View style={{alignItems: "center"}}>
										<Text>{drinkins.length}</Text>
										<Text
											style={{
												fontSize: 10,
												color: "gray",
											}}
										>
											Posts
										</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate("Friends", {
											activeTab: "Followers",
										})
									}
								>
									<View style={{alignItems: "center"}}>
										<Text>{followers.length}</Text>
										<Text
											style={{
												fontSize: 10,
												color: "gray",
											}}
										>
											Seguidores
										</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate("Friends", {
											activeTab: "Following",
										})
									}
								>
									<View style={{alignItems: "center"}}>
										<Text>{following.length}</Text>
										<Text
											style={{
												fontSize: 10,
												color: "gray",
											}}
										>
											Seguindo
										</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View
								style={{flexDirection: "row", paddingTop: 10}}
							>
								<Button
									title="Edit Profile"
									loading={isLoading}
									type="outline"
									// icon={{ name: "edit", type: "material-community" }}
									onPress={() =>
										navigation.push("ProfileEdit")
									}
									containerStyle={{
										flex: 3,
										marginLeft: 10,
										justifyContent: "center",
										height: 40,
									}}
								/>
								<Button
									loading={isLoading}
									type="outline"
									icon={{name: "settings"}}
									containerStyle={{
										flex: 1,
										marginLeft: 5,
										marginRight: 10,
										justifyContent: "center",
										height: 40,
									}}
								/>
							</View>
						</View>
					</View>
					<View
						style={{paddingVertical: 10, paddingHorizontal: 10}}
					>
						<Text style={{fontWeight: "bold"}}>
							{user.displayName}
						</Text>
						<Text></Text>
						<Text></Text>
					</View>
				</View>
			</SafeAreaView>
		</View>
	);
};
export default ProfileTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
