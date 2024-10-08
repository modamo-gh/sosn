import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";
import "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import ListOptionsActionSheet from "./src/components/ListOptionsActionSheet";
import ItemCollection from "./src/models/ItemCollection";
import HomeScreen from "./src/screens/HomeScreen";
import ItemCollectionScreen from "./src/screens/ItemCollectionScreen";
import { COLORS } from "./src/styles/colors";

const Drawer = createDrawerNavigator();

const App = () => {
	const actionSheetRef = useRef<ActionSheetRef>(null);

	const [currentCollection, setCurrentCollection] =
		useState<ItemCollection>();
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
			<Drawer.Navigator
				initialRouteName="Home"
				screenOptions={{
					drawerActiveBackgroundColor: COLORS.lightBlue,
					drawerActiveTintColor: COLORS.darkBlue,
					drawerInactiveTintColor: COLORS.lightBlue,
					drawerLabelStyle: { fontSize: 18 },
					drawerStyle: { backgroundColor: COLORS.mediumBlue },
					headerStyle: { backgroundColor: COLORS.mediumBlue },
					headerTintColor: COLORS.lightBlue
				}}
			>
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
									onPress={() => {
										setCurrentCollection(collection);
										actionSheetRef.current?.setModalVisible(
											true
										);
									}}
								>
									<Icon
										name="more-horizontal"
										style={{
											alignItems: "center",
											color: COLORS.lightBlue,
											fontSize: 22,
											justifyContent: "center",
											right: 16,
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
			<ListOptionsActionSheet
				actionSheetRef={actionSheetRef}
				collections={collections}
				currentCollection={currentCollection!}
				setCollections={setCollections}
				setCurrentCollection={setCurrentCollection}
				updateCollection={updateCollection}
			/>
		</NavigationContainer>
	);
};

export default App;
