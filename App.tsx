import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import ItemCollection from "./src/models/ItemCollection";
import HomeScreen from "./src/screens/HomeScreen";
import ItemCollectionScreen from "./src/screens/ItemCollectionScreen";

const Drawer = createDrawerNavigator();

const App = () => {
	const [collections, setCollections] = useState<ItemCollection[]>([]);

	useEffect(() => {
		const fetchCollections = async () => {
			const storedCollections = await AsyncStorage.getItem("collections");

			if (storedCollections) {
				setCollections(JSON.parse(storedCollections));
			}
		};

		fetchCollections();
	}, []);

	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen name="Home">
					{(props) => (
						<HomeScreen
							{...props}
							collections={collections}
							setCollections={setCollections}
						/>
					)}
				</Drawer.Screen>
				{collections.map((collection) => (
					<Drawer.Screen
						component={ItemCollectionScreen}
						key={collection.name}
						name={collection.name}
					/>
				))}
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default App;
