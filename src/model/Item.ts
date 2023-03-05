class Item {
    name: string;
    quantity: number;
    deleted: boolean;

    constructor(name = "", quantity = 1, deleted = false){
        this.name = name;
        this.quantity = quantity;
        this.deleted = deleted;
    }
}

export default Item;