class ItemCollection {
    name: string;
    newItem: string;
    oldItems: String[];

    constructor(name: string){
        this.name = name;
        this.newItem = "";
        this.oldItems = [];
    }
}

export default ItemCollection;