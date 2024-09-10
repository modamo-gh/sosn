import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { COLORS } from "../styles/colors";
import ItemCollection from "../models/ItemCollection";

type ItemProps = {
    index?: number;
    isNew: boolean;
    itemCollection: ItemCollection;
    setItemCollection: (a: ItemCollection) => void;
    value: string;
};

const Item: React.FC<ItemProps> = ({
    index,
    isNew,
    itemCollection,
    setItemCollection,
    value
}) => {
    return (
        <View
            style={[
                styles.container,
                isNew ? styles.newContainer : styles.oldContainer
            ]}
        >
            <Text
                style={[
                    styles.label,
                    isNew ? styles.newLabel : styles.oldLabel
                ]}
            >
                {value}
            </Text>
            <TouchableOpacity>
                <Icon
                    name="trash-2"
                    style={[
                        styles.icon,
                        isNew ? styles.newLabel : styles.oldLabel
                    ]}
                    onPress={() => {
                        const itemCollectionClone = { ...itemCollection };

                        if (isNew) {
                            if (itemCollectionClone.oldItems.length) {
                                const mostRecentOldItem =
                                    itemCollectionClone.oldItems.pop()!;

                                itemCollectionClone.newItem = mostRecentOldItem;
                            } else {
                                itemCollectionClone.newItem = "";
                            }
                        } else {
                            itemCollectionClone.oldItems.splice(
                                index as number,
                                1
                            );
                        }

                        setItemCollection(itemCollectionClone);
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderRadius: 5,
        flexDirection: "row",
        height: 48,
        justifyContent: "center",
        marginBottom: 12,
        minWidth: 176
    },
    icon: { fontSize: 16, paddingHorizontal: 8 },
    newContainer: { backgroundColor: COLORS.darkBlue },
    newLabel: { color: COLORS.lightBlue },
    oldContainer: { backgroundColor: COLORS.lightBlue },
    oldLabel: { color: COLORS.darkBlue },
    label: {
        flex: 1,
        fontSize: 24,
        textAlign: "center"
    }
});

export default Item;
