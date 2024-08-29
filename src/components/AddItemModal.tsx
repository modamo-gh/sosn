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
					<TouchableOpacity
						onPress={() => {
                            if(newItem){
                                const oldItemsClone = [...oldItems];
								oldItemsClone.push(newItem);
								setOldItems(oldItemsClone);
                            }
                            
                            setNewItem(inputText);
							setIsModalVisible(false);
						}}
						style={styles.button}
					>
						<Text style={styles.buttonText}>Submit</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		backgroundColor: COLORS.darkBlue,
		borderRadius: 5,
		height: 48,
		justifyContent: "center",
		marginTop: 12,
		width: 88
	},
	buttonText: { color: COLORS.lightBlue, fontSize: 16, fontWeight: "bold" },
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
