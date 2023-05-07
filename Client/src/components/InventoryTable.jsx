export default function InventoryTable(props) {
  return (
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {props.headers.map((h) => {
              return (
                <th scope="col" class="px-6 py-3">
                  {h}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props.inventory.map((i) => {
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td scope="col" class="px-6 py-3">
                {i.name}
              </td>
              <td scope="col" class="px-6 py-3">
                {i.quantity}
              </td>
              <td scope="col" class="px-6 py-3">
                {i.price}
              </td>
              <td scope="col" class="px-6 py-3">
                {i.cost}
              </td>
              <td scope="col" class="px-6 py-3">
                {i.minAge}
              </td>
              <td scope="col" class="px-6 py-3">
                {i.type}
              </td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}
