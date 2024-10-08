import React, { useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import AddItemModal from "../components/modals/AddItemModal";
import { COLORS } from "../styles/colors";
import ItemCollection from "../models/ItemCollection";
import Item from "../components/Item";
import { FlatList } from "react-native-gesture-handler";

type ItemCollectionScreenProps = {
	collection: ItemCollection;
	updateCollection: (a: ItemCollection) => void;
};

const ItemCollectionScreen: React.FC<ItemCollectionScreenProps> = ({
	collection,
	updateCollection
}) => {
	const [focusedSection, setFocusedSection] = useState("");
	const [index, setIndex] = useState(0);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [itemCollection, setItemCollection] = useState(collection);

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
									setItemCollection={(collection) => {
										setItemCollection(collection);
										updateCollection(collection);
									}}
								/>
							)}
							<TouchableOpacity
								onPress={() => setIsModalVisible(true)}
								style={styles.button}
							>
								<Text style={styles.buttonText}>
									Add New Item
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
						setItemCollection={(collection) => {
							setItemCollection(collection);
							updateCollection(collection);
						}}
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
					itemCollection.oldItems.length > 0 ? (
						itemCollection.oldItems.find(
							(oldItem) =>
								oldItem === itemCollection.oldItems[index]
						) && (
							<View style={{ flex: 1, flexDirection: "row" }}>
								<View
									style={{
										flex: 4,
										justifyContent: "center",
										alignItems: "center"
									}}
								>
									<Item
										index={index}
										isNew={false}
										itemCollection={itemCollection}
										setItemCollection={(collection) => {
											setItemCollection(collection);
											updateCollection(collection);
										}}
										value={itemCollection.oldItems[index]}
									/>
								</View>
								<FlatList
									CellRendererComponent={({ children }) => (
										<View
											style={{
												flex: 1,
												alignItems: "center",
												justifyContent: "center"
											}}
											children={children}
										/>
									)}
									contentContainerStyle={{
										backgroundColor: COLORS.mediumBlue,
										flex: 1
									}}
									data={itemCollection.oldItems}
									keyExtractor={(item) => item}
									renderItem={({ item }) => (
										<Text
											style={{
												color: COLORS.lightBlue,
												fontSize: 16,
												fontWeight: "bold",
												textAlign: "center"
											}}
										>
											{item}
										</Text>
									)}
								/>
							</View>
						)
					) : (
						<Text style={[styles.oldText, { fontSize: 24 }]}>
							Old Items is currently empty
						</Text>
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
		minWidth: 88,
		paddingHorizontal: 8
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
