import "./App.css";
import Toggle from "./components/Toggle";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

//TODO: Ir metiendo aqui la parte principal de la otra lista
//Cuidado al instalar las dependencias del otro proyecto, que me peto.
//El añadir items ya lo puse. Ahora ir poniendo el resto poco a poco
function App() {
  const [inputValue, setInputValue] = useState("");

  //TODO:refactorizar este codigo. Quiza hay cosas que no funcionan como quiero, etc
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
      // calculateTotal();
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
            index={index}
          ></Toggle>
        ))}
      </div>
    </div>


  );
}

export default App;