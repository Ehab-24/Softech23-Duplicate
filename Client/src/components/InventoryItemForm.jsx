import axios from 'axios';
import {
  createInventoryItem,
  updateInventoryItem
} from '../repository/inventory';
import { useState } from 'react';

export default function InventoryItemForm(props) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  let item = props.item;
  if (!item) {
    item = {
      item_title: '',
      minimum_age: 12,
      item_price: 200,
      item_quantity: 10,
      item_cost: 500,
      inventory_type: '',
      item_description: ''
    };
  }

  async function handleFile(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'fvm5pdkc');
    formData.append('cloud_name', 'dq1ho1jvc');

    setLoading(true);
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dq1ho1jvc/image/upload',
      formData
    );
    setImages([response.data.secure_url]);
    setLoading(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const {
      item_title,
      item_description,
      item_price,
      item_cost,
      item_quantity,
      inventory_type,
      minimum_age
    } = event.target.elements;

    const data = {
      item_title: item_title.value,
      item_description: item_description.value,
      item_price: item_price.value,
      item_cost: item_cost.value,
      item_quantity: item_quantity.value,
      inventory_type: inventory_type.value,
      minimum_age: minimum_age.value,
      item_images: images
    };
    props.item ? updateInventoryItem(item) : createInventoryItem(data);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
        <label htmlFor="item_title" className="flex flex-col gap-2">
          Title
          <input
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="item_title"
            placeholder={item.item_title}
          />
        </label>

        <label htmlFor="minimun_age" className="flex flex-col gap-2">
          Min Age
          <input
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="minimum_age"
            inventory_type="number"
            placeholder={item.minimum_age}
          />
        </label>
        <label htmlFor="item_price" className="flex flex-col gap-2">
          Price
          <input
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="item_price"
            placeholder={item.item_price}
            inventory_type="number"
          />
        </label>

        <label htmlFor="item_quantity" className="flex flex-col gap-2">
          Quantity
          <input
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="item_quantity"
            inventory_type="number"
            placeholder={item.item_quantity}
          />
        </label>

        <label htmlFor="item_cost" className="flex flex-col gap-2">
          Cost
          <input
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="item_cost"
            inventory_type="number"
            placeholder={item.item_cost}
          />
        </label>

        <label htmlFor="inventory_type" className="flex flex-col gap-2">
          Type
          <input
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="inventory_type"
            placeholder={item.inventory_type}
          />
        </label>
      </div>

      <label htmlFor="item_description" className="mt-8 flex flex-col gap-2">
        Description
        <textarea
          className="w-full h-32 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
          id="item_description"
          placeholder={item.item_description}
        />
      </label>

      <div className="flex justify-between">
        <label htmlFor="item_images" className="mt-8 flex flex-col gap-2">
          Images
          <input
            id="item_images"
            type="file"
            accept="image/jpeg image/png image/jpg"
            onChange={handleFile}
            multiple
          />
        </label>

        <button
          inventory_type="submit"
          disabled={loading}
          className="w-full md:w-32 mt-4 h-10 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 disabled:bg-gray-500"
        >
          {props.item ? 'Save' : 'Create'}
        </button>
      </div>
    </form>
  );
}
