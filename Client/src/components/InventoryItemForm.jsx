import { createInventoryItem } from '../repository/inventory';

export default function InventoryItemForm() {
  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      item_title: item_title.value,
      item_description: item_description.value,
      item_price: item_price.value,
      item_cost: item_cost.value,
      item_quantity: item_quantity.value,
      inventory_type: inventory_type.value,
      minimum_age: minimum_age.value
    };
    createInventoryItem(data);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
        <label htmlFor="item_title" className="flex flex-col gap-2">
          Title
          <input
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="item_title"
            placeholder="Item name..."
          />
        </label>

        <label htmlFor="minimun_age" className="flex flex-col gap-2">
          Min Age
          <input
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="minimum_age"
            type="number"
            placeholder="12..."
          />
        </label>
        <label htmlFor="item_price" className="flex flex-col gap-2">
          Price
          <input
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="item_price"
            placeholder="1500"
            type="number"
          />
        </label>

        <label htmlFor="item_quantity" className="flex flex-col gap-2">
          Quantity
          <input
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="item_quantity"
            type="number"
            placeholder="100"
          />
        </label>

        <label htmlFor="item_cost" className="flex flex-col gap-2">
          Cost
          <input
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="item_cost"
            type="number"
            placeholder="5000..."
          />
        </label>

        <label htmlFor="inventory_type" className="flex flex-col gap-2">
          Type
          <input
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="inventory_type"
            placeholder="Video Game..."
          />
        </label>
      </div>

      <label htmlFor="item_description" className="mt-8 flex flex-col gap-2">
        Description
        <textarea
          className="w-full h-32 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
          id="item_description"
          placeholder="Description..."
        />
      </label>

      <button
        type="submit"
        className="w-full md:w-32 mt-4 h-10 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
      >
        Create
      </button>
    </form>
  );
}
