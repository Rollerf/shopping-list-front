import "./App.css";
import React from 'react';
import { Routes, Route } from "react-router-dom";
import ShoppingList from "./pages/shoppingList/ShoppingList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShoppingList />}></Route>
    </Routes>
  );
}

export default App;
