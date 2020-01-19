import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Text, TextInput } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import {
	requestPermissionsAsync,
	getCurrentPositionAsync
} from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

export default function Main({ navigation }) {
	const [currentRegion, setCurrentRegion] = useState(null);

	useEffect(() => {
		async function loadInitialPosition() {
			const { granted } = await requestPermissionsAsync();
			if (granted) {
				const { coords } = await getCurrentPositionAsync({
					enableHighAccuracy: true
				});
				const { latitude, longitude } = coords;

				setCurrentRegion({
					latitude,
					longitude,
					latitudeDelta: 0.04,
					longitudeDelta: 0.04
				});
			}
		}
		loadInitialPosition();
	}, []);

	if (!currentRegion) {
		return null;
	}
	return (
		<>
			<MapView initialRegion={currentRegion} style={styles.map}>
				<Marker
					coordinate={{
						latitude: -22.560202,
						longitude: -44.9703053
					}}
				>
					<Image
						style={styles.avatar}
						source={{
							uri:
								"https://avatars2.githubusercontent.com/u/15326732?s=460&v=4"
						}}
					/>
					<Callout
						onPress={() => {
							navigation.navigate("Profile", {
								github_username: "gabrielrmodesto"
							});
						}}
					>
						<View style={styles.callout}>
							<Text style={styles.devname}>Gabriel Modesto</Text>
							<Text style={styles.devbio}>
								Full Stack Developer, Systems Analyst, Clara's
								Father, Thais' Husband and Rugby Player
							</Text>
							<Text style={styles.devtechs}>
								ReactJS, React Native, PHP
							</Text>
						</View>
					</Callout>
				</Marker>
			</MapView>
			<View style={styles.searchForm}>
				<TextInput 
					style={styles.searchInput}
					placeholder="Buscar devs por techs..."
					placeholderTextColor="#999"
					autoCapitalize="words"
					autoCorrect={false}
				/>
				<TouchableOpacity style={styles.loadButton}>
					<MaterialIcons name="my-location" size={20} color="#FFF" />
				</TouchableOpacity>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	map: {
		flex: 1
	},
	avatar: {
		width: 54,
		height: 54,
		borderRadius: 4,
		borderWidth: 4,
		borderColor: "#FFF"
	},
	callout: {
		width: 260
	},
	devname: {
		fontWeight: "bold",
		fontSize: 16
	},
	devbio: {
		color: "#666",
		marginTop: 5
	},
	devtechs: {
		marginTop: 5
	},
	searchForm: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		zIndex: 5,
		flexDirection: 'row',
	},
	searchInput: {
		flex: 1,
		height: 50,
		backgroundColor: '#FFF',
		color: '#333',
		borderRadius: 25,
		paddingHorizontal: 20,
		fontSize: 16,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowOffset: {
			width: 4,
			height: 4,
		},
		elevation: 2,
	},
	loadButton: {
		width: 50,
		height: 50,
		backgroundColor: '#8E4DFF',
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 15,
	}
});
