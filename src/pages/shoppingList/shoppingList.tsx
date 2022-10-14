import Toggle from "../../components/toggle/Toggle";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import itemService from "../../services/ItemService";
import Item from "../../model/Item";

function ShoppingList() {
  const [inputValue, setInputValue] = useState("");
  const [itemsState, setItemsState] = useState<Item[]>([]);

  useEffect(() => {
    itemService.getItems().then(response => {
      setItemsState(response.data);
    }
      ).catch(err => console.log("Error obteniendo la data: " + err));
  }, []);

  const handleAddButtonClick = () => {
    if (
      inputValue.trim() !== "" &&
      itemsState.filter((e) => e.name.toLowerCase() === inputValue.toLowerCase())
        .length < 1
    ) {
      let newItem = new Item("", inputValue.trim(), 1);
      
      setInputValue("");
      itemService.createItem(newItem).then(response => {
        newItem = response.data;
        let newItems = [...itemsState, newItem];
        setItemsState(newItems);
      }
        ).catch(err => console.log("Error obteniendo la data: " + err));
    }
    }

  const toggleDelete = (item: Item) => {
    console.log("Item to delete: " + item.name);

    let filtered = itemsState.filter((value) => {
      return value.name !== item.name;
    });

    setItemsState(filtered);
    itemService.deleteItem(item.id);
  };

  const handleQuantityDecrease = (item: Item) => {
    let index = itemsState.findIndex((value) => {
      return value.name === item.name;
    });

    let newItems = [...itemsState];

    if (newItems[index].quantity > 0) {
      newItems[index].quantity--;
    }

    setItemsState(newItems);
    itemService.modifyItem(newItems[index]);
  };

  const handleQuantityIncrease = (item: Item) => {
    let index = itemsState.findIndex((value) => {
      return value.name === item.name;
    });

    var newItems = [...itemsState];

    newItems[index].quantity++;

    setItemsState(newItems);
    itemService.modifyItem(newItems[index]);
  };

  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="add-item-input"
            placeholder="Add an item..."
          />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => handleAddButtonClick()}
          />
        </div>
        {itemsState.map((item) => (
          <Toggle
            key={item.id}
            item={item}
            toggleDelete={toggleDelete}
            handleQuantityDecrease={handleQuantityDecrease}
            handleQuantityIncrease={handleQuantityIncrease}
          ></Toggle>
        ))}
      </div>
    </div>
  );
}

export default ShoppingList;