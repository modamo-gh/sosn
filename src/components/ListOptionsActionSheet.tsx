import { Text, TouchableOpacity, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

type ListOptionsActionSheetProps = {
	actionSheetRef: React.RefObject<ActionSheetRef>;
};

const ListOptionsActionSheet: React.FC<ListOptionsActionSheetProps> = ({
	actionSheetRef
}) => {
	return (
		<ActionSheet ref={actionSheetRef}>
			<View style={{ padding: 20 }}>
				<TouchableOpacity onPress={() => console.log("Edit name")}>
					<Text
						style={{ fontSize: 18 }}
						
					>
						Edit List Name
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => console.log("Delete list")}>
					<Text
						style={{ fontSize: 18 }}
						
					>
						Delete List
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() =>
							actionSheetRef.current?.setModalVisible(false)
						}>
					<Text
						style={{ fontSize: 18 }}
						
					>
						Cancel
					</Text>
				</TouchableOpacity>
			</View>
		</ActionSheet>
	);
};

export default ListOptionsActionSheet;
