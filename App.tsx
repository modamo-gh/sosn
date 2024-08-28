import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

const App = () => {
	const [focusedSection, setFocusedSection] = useState<string>("");

	return (
		<View style={styles.container}>
			<Pressable
				onPress={() => setFocusedSection("new")}
				style={[styles.new, focusedSection === "new" && styles.focused]}
			></Pressable>
			<Pressable
				onPress={() => setFocusedSection("old")}
				style={[styles.old, focusedSection === "old" && styles.focused]}
			></Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, flexDirection: "column", width: "100%" },
	focused: {
		flex: 4
	},
	new: {
		backgroundColor: "#90E0EF",
		flex: 1
	},
	old: { backgroundColor: "#0077B6", flex: 1 }
});

export default App;
