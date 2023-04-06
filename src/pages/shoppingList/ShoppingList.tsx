import Toggle from "../../components/toggle/Toggle";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import ItemService from "../../services/ItemService";
import Item from "../../model/Item";
import './ShoppingList.css';
import { removeToken, saveToken } from "../../services/AuthHeader";

function ShoppingList() {
  const [inputValue, setInputValue] = useState("");
  const [itemsState, setItemsState] = useState<Item[]>([]);
  const congnitoLoginUrl = process.env.REACT_APP_COGNITO_LOGIN_URL || "error";

  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.hash);
    let idToken = urlParams.get('#id_token');
    let tokenType = urlParams.get('token_type');

    if (idToken != null && tokenType != null) {
      saveToken(idToken, tokenType);
    }

    ItemService.getItems().then(response => {
      if (response.data) {
        setItemsState(response.data);
      }
    }
    ).catch(err => {
      console.log("Error obteniendo la data: " + err);
      removeToken();
      window.location.replace(congnitoLoginUrl);
    });
  }, []);

  const handleAddButtonClick = () => {
    let inputName = inputValue.trim().toLowerCase();
    let newItem: Item;
    setInputValue("");

    if (inputName === "") {
      return;
    }

    newItem = itemsState.filter((e) => e.name.toLowerCase() === inputName)[0];

    if (inputName !== "" && newItem === undefined) {
      console.log("Create item: " + inputName);
      newItem = new Item(inputName);
      ItemService.createItem(newItem).then(() => {
        addItem(itemsState, newItem, setItemsState);
      }
      ).catch(err => console.log(err));

      return;
    }

    if (newItem.deleted) {
      console.log("Modify item: " + inputName);
      let newItems = itemsState.filter((e) => e.name.toLowerCase() !== inputName);
      newItem.deleted = false;
      ItemService.modifyItem(newItem).then(() => {
        addItem(newItems, newItem, setItemsState);
      }
      ).catch(err => console.log(err));
    }
  }

  const toggleDelete = (item: Item) => {
    let updatedList: Item[] = itemsState.map((value) => {
      if (value.name === item.name) {
        value.deleted = !value.deleted;
      }

      return value;
    });

    setItemsState(updatedList);
    ItemService.deleteItem(item);
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
    ItemService.modifyItem(newItems[index]);
  };

  const handleQuantityIncrease = (item: Item) => {
    let index = itemsState.findIndex((value) => {
      return value.name === item.name;
    });

    let newItems = [...itemsState];

    newItems[index].quantity++;

    setItemsState(newItems);
    ItemService.modifyItem(newItems[index]);
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
        {itemsState.filter(item => !item.deleted).map((item) => (
          <Toggle
            key={item.name}
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

function addItem(itemsState: Item[], newItem: Item, setItemsState: React.Dispatch<React.SetStateAction<Item[]>>) {
  let newItems = [...itemsState, newItem];
  newItems.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  setItemsState(newItems);
}
