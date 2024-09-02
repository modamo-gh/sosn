class ItemCollection {
    name: string;
    newItem: string;
    oldItems: string[];

    constructor(name: string){
        this.name = name;
        this.newItem = "";
        this.oldItems = [];
    }
}

export default ItemCollection;