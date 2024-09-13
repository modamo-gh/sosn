import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { COLORS } from "../styles/colors";
import ItemCollection from "../models/ItemCollection";
import { useState } from "react";
import EditListNameModal from "./modals/EditListNameModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ListOptionsActionSheetProps = {
	actionSheetRef: React.RefObject<ActionSheetRef>;
	collections: ItemCollection[];
	currentCollection: ItemCollection;
	setCollections: (a: ItemCollection[]) => void;
	setCurrentCollection: (a: ItemCollection) => void;
	updateCollection: (a: ItemCollection) => void;
};

const ListOptionsActionSheet: React.FC<ListOptionsActionSheetProps> = ({
	actionSheetRef,
	collections,
	currentCollection,
	setCollections,
	setCurrentCollection,
	updateCollection
}) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	return (
		<ActionSheet
			containerStyle={styles.actionSheet}
			ref={actionSheetRef}
		>
			<View>
				<TouchableOpacity
					onPress={() => {
						setIsModalVisible(true);
					}}
				>
					<Text style={styles.option}>Edit List Name</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={async () => {
						const collectionsClone = [...collections];
						const index = collectionsClone.findIndex(
							(collection) =>
								collection.id === currentCollection.id
						);

						if(index >= 0){
							collectionsClone.splice(index, 1);
						}

						try {
							await AsyncStorage.setItem(
								"collections",
								JSON.stringify(collectionsClone)
							);
							setCollections(collectionsClone);
						} catch (error) {
							console.error(
								"Something went wrong deleting collection:",
								error
							);
						}
					}}
				>
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
			<EditListNameModal
				itemCollection={currentCollection}
				setIsModalVisible={setIsModalVisible}
				setItemCollection={setCurrentCollection}
				updateCollection={updateCollection}
				visibility={isModalVisible}
			/>
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
