import { useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import AddItemModal from "./src/components/AddItemModal";
import { COLORS } from "./src/styles/colors";

const App = () => {
	const [focusedSection, setFocusedSection] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [newItem, setNewItem] = useState("");
	const [oldItems, setOldItems] = useState<String[]>([]);

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
							<Text style={styles.newItem}>{newItem}</Text>
							<TouchableOpacity
								onPress={() => setIsModalVisible(true)}
								style={styles.button}
							>
								<Text style={styles.buttonText}>
									{newItem ? "Change" : "Add"}
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
						newItem={newItem}
						oldItems={oldItems}
						setIsModalVisible={setIsModalVisible}
						setNewItem={setNewItem}
						setOldItems={setOldItems}
						visibility={isModalVisible}
					/>
				) : null}
			</View>
			<Pressable
				onPress={() => setFocusedSection("old")}
				style={[
					styles.oldSection, // Don't move; must come before conditional
					styles.section,
					focusedSection === "old" && styles.focused
				]}
			>
				{focusedSection === "old" ? (
					<Text style={[styles.oldText, styles.sectionText]}>
						{oldItems[Math.floor(Math.random() * oldItems.length)]}
					</Text>
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
	newItem: { marginTop: 12, fontSize: 24 },
	newSection: { backgroundColor: COLORS.lightBlue },
	newText: { color: COLORS.darkBlue },
	oldSection: { backgroundColor: COLORS.darkBlue },
	oldText: { color: COLORS.lightBlue },
	pressable: {
		alignItems: "center",
		borderColor: "black",
		borderWidth: 1,
		flex: 1,
		justifyContent: "center",
		width: "100%"
	},
	section: { alignItems: "center", flex: 1, justifyContent: "center" },
	sectionText: { fontSize: 24, fontWeight: "bold" }
});

export default App;
