import React from 'react';
import axios, {AxiosError} from 'axios';
import { isTemplateExpression, textChangeRangeIsUnchanged } from 'typescript';
import Item from "../model/Item";

class ItemService{
  async getItems() {
      return await axios.get('http://localhost:3001/items');
  }

  saveItem(item :any) {
    return axios.post('', item).then((response) => {
        console.log(response.data);
      });
  }
}

export default new ItemService;