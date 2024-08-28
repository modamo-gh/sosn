import { StyleSheet, View } from "react-native";

const App = () => {
	return (
		<View style={styles.container}>
			<View style={styles.new}></View>
			<View style={styles.old}></View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, width: "100%", flexDirection: "column" },
	new: {
		backgroundColor: "#90E0EF",
		flex: 1,
		width: "100%",
		height: "100%"
	},
	old: { backgroundColor: "#0077B6", flex: 1, width: "100%", height: "100%" }
});

export default App;
