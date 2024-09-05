import React, { useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import AddItemModal from "../components/AddItemModal";
import { COLORS } from "../styles/colors";
import ItemCollection from "../models/ItemCollection";
import Item from "../components/Item";

type ItemCollectionScreenProps = {
	collection: ItemCollection;
	updateCollection: (a: ItemCollection) => void;
};

const ItemCollectionScreen: React.FC<ItemCollectionScreenProps> = ({
	collection,
	updateCollection
}) => {
	const [focusedSection, setFocusedSection] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [itemCollection, setItemCollection] = useState(collection);
	const [index, setIndex] = useState(0);

	const getRandomIndex = () => {
		const randomIndex = Math.floor(
			Math.random() * itemCollection.oldItems.length
		);

		setIndex(randomIndex);

		return randomIndex;
	};

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.newSection, // Don't move; must come before conditional
					styles.section,
					focusedSection === "new" && styles.focused
				]}
			>
				<Pressable
					style={styles.pressable}
					onPress={() => setFocusedSection("new")}
				>
					{focusedSection === "new" ? (
						<View style={styles.innerNew}>
							{itemCollection.newItem && (
								<Item
									value={itemCollection.newItem}
									isNew={true}
									itemCollection={itemCollection}
									setItemCollection={setItemCollection}
								/>
							)}
							<TouchableOpacity
								onPress={() => setIsModalVisible(true)}
								style={styles.button}
							>
								<Text style={styles.buttonText}>
									{itemCollection.newItem ? "Change" : "Add"}
								</Text>
							</TouchableOpacity>
						</View>
					) : (
						<Text style={[styles.newText, styles.sectionText]}>
							New
						</Text>
					)}
				</Pressable>
				{isModalVisible ? (
					<AddItemModal
						itemCollection={itemCollection}
						setItemCollection={setItemCollection}
						setIsModalVisible={setIsModalVisible}
						updateCollection={updateCollection}
						visibility={isModalVisible}
					/>
				) : null}
			</View>
			<Pressable
				onPress={() => {
					setFocusedSection("old");
					getRandomIndex();
				}}
				style={[
					styles.oldSection, // Don't move; must come before conditional
					styles.section,
					focusedSection === "old" && styles.focused
				]}
			>
				{focusedSection === "old" ? (
					itemCollection.oldItems.length > 0 &&
					itemCollection.oldItems.find(
						(oldItem) => oldItem === itemCollection.oldItems[index]
					) && (
						<Item
							index={index}
							isNew={false}
							itemCollection={itemCollection}
							setItemCollection={setItemCollection}
							value={itemCollection.oldItems[index]}
						/>
					)
				) : (
					<Text style={[styles.oldText, styles.sectionText]}>
						Old
					</Text>
				)}
			</Pressable>
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
	container: { flex: 1, flexDirection: "column", width: "100%" },
	focused: { flex: 4 },
	innerNew: { alignItems: "center", justifyContent: "center" },
	newSection: { backgroundColor: COLORS.lightBlue },
	newText: { color: COLORS.darkBlue },
	oldSection: { backgroundColor: COLORS.darkBlue },
	oldText: { color: COLORS.lightBlue },
	pressable: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		width: "100%"
	},
	section: { alignItems: "center", flex: 1, justifyContent: "center" },
	sectionText: { fontSize: 24, fontWeight: "bold" }
});

export default ItemCollectionScreen;
