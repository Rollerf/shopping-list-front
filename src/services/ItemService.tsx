import React from 'react';
import axios from 'axios';
import Item from "../model/Item";
import env from "react-dotenv";

let ROUTE = env.ENDPOINT + '/items';

class ItemService{
  async getItems() {
    console.log(process.env.ENDPOINT);
      return await axios.get(ROUTE);
  }

  async createItem(item :Item) {
    return await axios.post(ROUTE, item)
  }

  async modifyItem(item :Item) {
    return await axios.patch(ROUTE + '/' + item.id, item)
  }

 async deleteItem(id: string){
  return await axios.delete(ROUTE + '/' + id);
 }
  
}

export default new ItemService;