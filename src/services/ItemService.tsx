import React from 'react';
import axios from 'axios';
import { isTemplateExpression, textChangeRangeIsUnchanged } from 'typescript';
import Item from "../model/Item";

class ItemService{
  getItems(): Item[]  {
    axios.get('').then((response) => {
        console.log(response.data);

        return response.data;
      });
      return [];
  }

  saveItem(item :any) {
    return axios.post('', item).then((response) => {
        console.log(response.data);
      });
  }
}

export default new ItemService;