import "./App.css";
import Toggle from "./components/toggle/Toggle";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//TODO: Call api endpoints
function App() {
  const [inputValue, setInputValue] = useState("");

  const handleAddButtonClick = () => {
    if (
      inputValue.trim() !== "" &&
      items.filter((e) => e.itemName.toLowerCase() === inputValue.toLowerCase())
        .length < 1
    ) {
      const newItem = {
        itemName: inputValue.trim(),
        quantity: 1,
        isSelected: false,
      };

      const newItems = [...items, newItem];

      setItems(newItems);
      setInputValue("");
    }
  };

  const [items, setItems] = useState([
    { itemName: "item 1", quantity: 1, isSelected: false },
    { itemName: "item 2", quantity: 3, isSelected: true },
    { itemName: "item 3", quantity: 2, isSelected: false },
  ]);

  const toggleDelete = (item: any) => {
    console.log("Item to delete: " + item.itemName);

    var filtered = items.filter((value) => {
      return value.itemName !== item.itemName;
    });

    setItems(filtered);
  };

  const handleQuantityDecrease = (item: any) => {
    let index = items.findIndex((value) => {
      return value.itemName === item.itemName;
    });

    var newItems = [...items];

    if (newItems[index].quantity > 0) {
      newItems[index].quantity--;
    }

    setItems(newItems);
  };

  const handleQuantityIncrease = (item: any) => {
    let index = items.findIndex((value) => {
      return value.itemName === item.itemName;
    });

    var newItems = [...items];

    newItems[index].quantity++;

    setItems(newItems);
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
        {items.map((item, index) => (
          <Toggle
            key={item.itemName}
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
