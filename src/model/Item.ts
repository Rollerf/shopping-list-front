class Item {
    id: string;
    name: string;
    quantity: number;
    isSelected: boolean;
    isDeleted: boolean;

    constructor(id = "0", name = "", quantity = 0, isSelected = false, isDeleted = false){
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.isSelected = isSelected;
        this.isDeleted = isDeleted;
    }
}

export default Item;