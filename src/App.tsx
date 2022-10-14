import "./App.css";
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ShoppingList from "./pages/shoppingList/shoppingList";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShoppingList />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
