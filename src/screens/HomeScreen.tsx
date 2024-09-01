import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import { COLORS } from "../styles/colors";
import React, { useState } from "react";
import ItemCollection from "../models/ItemCollection";
import AsyncStorage from "@react-native-async-storage/async-storage";

type HomeScreenProps = {
	collections: ItemCollection[];
	setCollections: (a: ItemCollection[]) => void;
};

const HomeScreen: React.FC<HomeScreenProps> = ({
	collections,
	setCollections
}) => {
	const [inputText, setInputText] = useState("");

	return (
		<View style={styles.container}>
			<Text style={[styles.text, { marginBottom: 8 }]}>
				Swipe from the left to see your current collections
			</Text>
			<Text style={[styles.text, { marginBottom: 12 }]}>
				Or click the button below to add a new collection
			</Text>
			<TextInput
				onChangeText={(text) => setInputText(text)}
				placeholder="Enter Your New Collection Name"
				placeholderTextColor={COLORS.lightBlue}
				style={styles.textInput}
				value={inputText}
			/>
			<TouchableOpacity
				onPress={async () => {
					if (
						!collections.find(
							(collection) => collection.name === inputText
						)
					) {
						const collection = new ItemCollection(inputText);
						const collectionsClone = [...collections];

						collectionsClone.push(collection);
						setCollections(collectionsClone);
                        try {
                            await AsyncStorage.setItem("collections", JSON.stringify(collectionsClone))
                        } catch (error) {
                            console.error("Something went wrong saving collection:", error)
                        }
					}

                    setInputText("");
				}}
				style={[styles.button, { marginTop: 12 }]}
			>
				<Text style={[styles.text, { fontWeight: "bold" }]}>
					Submit
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		height: 48,
		width: 88,
		backgroundColor: COLORS.darkBlue,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5
	},
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		backgroundColor: COLORS.mediumBlue
	},
	text: { fontSize: 16, color: COLORS.lightBlue },
	textInput: {
		backgroundColor: COLORS.darkBlue,
		borderRadius: 5,
		color: COLORS.lightBlue,
		height: 48,
		paddingLeft: 8,
		width: "80%"
	}
});

export default HomeScreen;
