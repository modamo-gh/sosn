import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import ItemCollection from "./src/models/ItemCollection";
import HomeScreen from "./src/screens/HomeScreen";
import ItemCollectionScreen from "./src/screens/ItemCollectionScreen";
import Icon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native";

const Drawer = createDrawerNavigator();

const App = () => {
	const [collections, setCollections] = useState<ItemCollection[]>([]);

	const fetchCollections = async () => {
		const storedCollections = await AsyncStorage.getItem("collections");

		if (storedCollections) {
			setCollections(JSON.parse(storedCollections));
		}
	};

	const updateCollection = async (updatedCollection: ItemCollection) => {
		const updatedCollections = collections.map((collection) =>
			collection.id === updatedCollection.id
				? updatedCollection
				: collection
		);

		setCollections(updatedCollections);
		await AsyncStorage.setItem(
			"collections",
			JSON.stringify(updatedCollections)
		);
	};

	useEffect(() => {
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
				{collections.map((collection, index) => (
					<Drawer.Screen
						key={collection.id}
						name={collection.name}
						options={{
							headerRight: () => (
								<TouchableOpacity
									onPress={async () => {
										const collectionsClone = [
											...collections
										];

										collectionsClone.splice(index, 1);
										setCollections(collectionsClone);
										await AsyncStorage.setItem(
											"collections",
											JSON.stringify(collectionsClone)
										);
									}}
								>
									<Icon
										name="trash-2"
										style={{
											alignItems: "center",
											justifyContent: "center",
											right: 16,
											fontSize: 22
										}}
									/>
								</TouchableOpacity>
							)
						}}
					>
						{() => (
							<ItemCollectionScreen
								collection={collection}
								updateCollection={updateCollection}
							/>
						)}
					</Drawer.Screen>
				))}
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default App;
