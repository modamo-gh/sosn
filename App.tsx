import ItemGroup from "./src/screens/ItemCollectionScreen";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import { useState } from "react";
import ItemCollection from "./src/models/ItemCollection";

const Drawer = createDrawerNavigator();

const App = () => {
	const [collections, setCollections] = useState<ItemCollection[]>([]);

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
						key={collection.name}
						name={collection.name}
						component={ItemGroup}
					/>
				))}
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default App;
