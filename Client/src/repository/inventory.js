import { appAPI } from '.';
import axios from 'axios';

export async function getInventoryItems(limit = 20, page = 1) {
  try {
    const response = await appAPI.get('/item', {
      params: { limit, page }
    });
    return response.data.items;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function getInventoryItemById(id, formHeaders) {
  try {
    const response = await appAPI.get(`/item/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function createInventoryItem(item) {
  try {
    // const formData = new FormData();
    // for (let i = 0; i < item.item_images.length; i++) {
    //   formData.append('file', item.item_images[i].file);
    // }
    // formData.append('image', item.item_images[0]);

    // const res = await axios.post(
    //   'https://api.imgbb.com/1/upload?expiration=600&key=61e3a97c0be2f73b565f1f43440c5e0c',
    //   formData,
    //   {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    // );
    // item.item_images = [res.data];
    // console.log(item.item_images);

    const response = await appAPI.post('/item', item);
    return response;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function updateInventoryItem(item) {
  try {
    const response = await appAPI.patch(`/inventory/${item.id}`, [item]);
    return response;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function deleteInventoryItem(id) {
  try {
    const response = await appAPI.delete(`/item/${id}`);
    return response;
  } catch (error) {
    console.warn(error);
    return null;
  }
}
