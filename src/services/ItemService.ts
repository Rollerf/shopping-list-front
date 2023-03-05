import axios from 'axios';
import Item from "../model/Item";
import { authHeader } from "./AuthHeader";

const API_URL = process.env.REACT_APP_API_URL + '//items';
const header = { headers: authHeader() };

class ItemService {
  async getItems() {
    return await axios.get(API_URL, header);
  }

  async createItem(item: Item) {
    return await axios.post(API_URL, item, header)
  }

  async modifyItem(item: Item) {
    return await axios.patch(API_URL, item, header)
  }

  async deleteItem(item: Item) {
    item.deleted = true;
    return await axios.patch(API_URL, item, header);
  }
}

export default new ItemService;