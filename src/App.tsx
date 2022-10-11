import "./App.css";
import Toggle from "./components/toggle/Toggle";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import itemService from "./services/ItemService";
import Item from "./model/Item";
import ItemService from "./services/ItemService";

function App() {
  const [inputValue, setInputValue] = useState("");
  let items:Item[] = [];
  const [itemsState, setItemsState] = useState(items);

  useEffect(() => {
    itemService.getItems().then(response => {
      items = response.data;
      setItemsState(items);
      console.log(items.length);
    }
      ).catch(err => console.log("Error obteniendo la data: " + err));
  },[]);

  const handleAddButtonClick = () => {
    if (
      inputValue.trim() !== "" &&
      items.filter((e) => e.name.toLowerCase() === inputValue.toLowerCase())
        .length < 1
    ) {

      const newItem = new Item("", inputValue.trim(), 1);
      const newItems = [...items, newItem];

      setItemsState(newItems);
      setInputValue("");
    }
  };

  const toggleDelete = (item: Item) => {
    console.log("Item to delete: " + item.name);

    var filtered = items.filter((value) => {
      return value.name !== item.name;
    });

    setItemsState(filtered);
  };

  const handleQuantityDecrease = (item: Item) => {
    let index = items.findIndex((value) => {
      return value.name === item.name;
    });

    var newItems = [...items];

    if (newItems[index].quantity > 0) {
      newItems[index].quantity--;
    }

    setItemsState(newItems);
  };

  const handleQuantityIncrease = (item: Item) => {
    let index = items.findIndex((value) => {
      return value.name === item.name;
    });

    var newItems = [...items];

    newItems[index].quantity++;

    setItemsState(newItems);
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

export default App;
