import React from 'react';
import axios, {AxiosError} from 'axios';
import { isTemplateExpression, textChangeRangeIsUnchanged } from 'typescript';
import Item from "../model/Item";

let ROUTE = 'http://localhost:3001/items';

class ItemService{
  async getItems() {
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