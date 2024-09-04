import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { COLORS } from "../styles/colors";

type ItemProps = {
    isNew: boolean;
    value: string;
};

const Item: React.FC<ItemProps> = ({ value, isNew }) => {
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
                    onPress={() => console.log("press")}
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
        minWidth: 176,
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
