import { useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { COLORS } from "./src/styles/colors";

const App = () => {
	const [focusedSection, setFocusedSection] = useState<string>("");
	const [newItem, setNewItem] = useState<string>("");
	const [oldItems, setOldItems] = useState<String[]>([]);

	return (
		<View style={styles.container}>
			<Pressable
				onPress={() => setFocusedSection("new")}
				style={[
					styles.newSection, // Don't move; must come before conditional
					styles.section,
					focusedSection === "new" && styles.focused
				]}
			>
				{focusedSection === "new" ? (
					<View
						style={{
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						<Text style={styles.newItem}>{newItem}</Text>
						<TouchableOpacity style={styles.button}>
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
			<Pressable
				onPress={() => setFocusedSection("old")}
				style={[
					styles.oldSection, // Don't move; must come before conditional
					styles.section,
					focusedSection === "old" && styles.focused
				]}
			>
				{focusedSection === "old" ? (
					<Text>
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
	newItem: { marginTop: 12, fontSize: 16 },
	newSection: { backgroundColor: COLORS.lightBlue },
	newText: { color: COLORS.darkBlue },
	oldSection: { backgroundColor: COLORS.darkBlue },
	oldText: { color: COLORS.lightBlue },
	section: { alignItems: "center", flex: 1, justifyContent: "center" },
	sectionText: { fontSize: 24, fontWeight: "bold" }
});

export default App;
