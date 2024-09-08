import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { COLORS } from "../styles/colors";

type ListOptionsActionSheetProps = {
	actionSheetRef: React.RefObject<ActionSheetRef>;
};

const ListOptionsActionSheet: React.FC<ListOptionsActionSheetProps> = ({
	actionSheetRef
}) => {
	return (
		<ActionSheet
			containerStyle={styles.actionSheet}
			ref={actionSheetRef}
		>
			<View>
				<TouchableOpacity onPress={() => console.log("Edit name")}>
					<Text style={styles.option}>Edit List Name</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => console.log("Delete list")}>
					<Text style={styles.option}>Delete List</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() =>
						actionSheetRef.current?.setModalVisible(false)
					}
				>
					<Text style={styles.option}>Cancel</Text>
				</TouchableOpacity>
			</View>
		</ActionSheet>
	);
};

const styles = StyleSheet.create({
	actionSheet: {
		backgroundColor: COLORS.mediumBlue,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		height: 150,
		padding: 20
	},
	option: {
		color: COLORS.lightBlue,
		fontSize: 18,
		fontWeight: "bold",
		height: 48
	}
});

export default ListOptionsActionSheet;
