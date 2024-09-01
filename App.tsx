import ItemGroup from "./src/components/ItemGroup";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import { useState } from "react";

const Drawer = createDrawerNavigator();

const App = () => {
const [collections, setCollections] = useState([]);

	return (
		<NavigationContainer>
			<HomeScreen></HomeScreen>
		</NavigationContainer>
	);
};

export default App;
