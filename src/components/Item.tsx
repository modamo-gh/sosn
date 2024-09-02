import {Text, TextStyle } from "react-native";

type ItemProps = {
    value: string;
    style?: TextStyle | TextStyle[] 
}

const Item: React.FC<ItemProps> = ({value, style}) => {
	return <Text style={style}>{value}</Text>;
};


export default Item;
