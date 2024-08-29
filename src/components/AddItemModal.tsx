import React, { useState } from "react";
import {
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import { COLORS } from "../styles/colors";

type AddItemModalProps = {
	newItem: string;
	oldItems: String[];
	setIsModalVisible: (a: boolean) => void;
	setNewItem: (a: string) => void;
	setOldItems: (a: String[]) => void;
	visibility: boolean;
};

const AddItemModal: React.FC<AddItemModalProps> = ({
	newItem,
	oldItems,
	setIsModalVisible,
	setNewItem,
	setOldItems,
	visibility
}) => {
	const [inputText, setInputText] = useState("");

	return (
		<View>
			<Modal
				animationType="fade"
				onRequestClose={() => setIsModalVisible(false)}
				transparent={true}
				visible={visibility}
			>
				<View style={styles.innerModalContainer}>
					<TextInput
						onChangeText={(text) => setInputText(text)}
						placeholder="Enter Your New Item"
						placeholderTextColor={COLORS.lightBlue}
						style={styles.textInput}
						value={inputText}
					/>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={() => setIsModalVisible(false)}
							style={[styles.button, {backgroundColor: COLORS.lightBlue}]}
						>
							<Text style={[styles.buttonText, {color: COLORS.darkBlue}]}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								if (newItem) {
									const oldItemsClone = [...oldItems];
									oldItemsClone.push(newItem);
									setOldItems(oldItemsClone);
								}

								setNewItem(inputText);
								setIsModalVisible(false);
							}}
							style={[styles.button, {backgroundColor: COLORS.darkBlue}]}
						>
							<Text style={[styles.buttonText, {color: COLORS.lightBlue}]}>Submit</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		borderRadius: 5,
		height: 48,
		justifyContent: "center",
		marginTop: 12,
		width: 88
	},
	buttonContainer: {
		flexDirection: "row",
		width: "80%",
		justifyContent: "space-between"
	},
	buttonText: {fontSize: 16, fontWeight: "bold" },
	innerModalContainer: {
		alignItems: "center",
		backgroundColor: COLORS.mediumBlue,
		borderColor: COLORS.darkBlue,
		borderRadius: 5,
		borderWidth: 4,
		height: "24%",
		justifyContent: "center",
		marginHorizontal: "10%",
		marginTop: "60%",
		width: "80%"
	},
	textInput: {
		backgroundColor: COLORS.darkBlue,
		borderRadius: 5,
		color: COLORS.lightBlue,
		height: 48,
		paddingLeft: 8,
		width: "80%"
	}
});

export default AddItemModal;
