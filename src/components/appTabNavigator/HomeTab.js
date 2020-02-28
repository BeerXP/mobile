import React, {Component} from "react";
import {SafeAreaView, View, Text, StyleSheet} from "react-native";
import {ActivityIndicator} from "react-native";
import {Card, ListItem, Button, Icon} from "react-native-elements";

import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const HomeTab = ({navigation}) => {
	return (
		<SafeAreaView style={styles.container}>
			<Card
				title="Guinness Draught"
				PlaceholderContent={<ActivityIndicator />}
				image={{
					uri:
						"https://www.stickpng.com/assets/images/585e62eecb11b227491c33fb.png",
				}}
			>
				<View>
					<Text style={{marginBottom: 10}}>
						The idea with React Native Elements is more about
						component structure than actual design.
					</Text>
					<View style={{flex: 2, flexDirection: "row"}}>
						<View tyle={{flex: 1, flexGrow: "0.5"}}>
							<Button
								title="Drinkin"
								icon={
									<Icons
										name="beer"
										size={24}
										color="#ffffff"
									/>
								}
							/>
						</View>
						<View tyle={{flex: 1, flexGrow: "0.5"}}>
							<Button
								title="Detalhes"
								icon={
									<Icons
										name="details"
										size={24}
										color="#ffffff"
									/>
								}
							/>
						</View>
					</View>
				</View>
			</Card>
		</SafeAreaView>
	);
};
export default HomeTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
