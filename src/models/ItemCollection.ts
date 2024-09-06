class ItemCollection {
	id: string;
	name: string;
	newItem: string;
	oldItems: string[];

	constructor(name: string) {
		this.id = Math.random().toString(36).substring(2);
		this.name = name;
		this.newItem = "";
		this.oldItems = [];
	}
}

export default ItemCollection;
