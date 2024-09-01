import {
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import { COLORS } from "../styles/colors";
import { useState } from "react";

const HomeScreen = () => {
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
			<TouchableOpacity style={[styles.button, { marginTop: 12 }]}>
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
