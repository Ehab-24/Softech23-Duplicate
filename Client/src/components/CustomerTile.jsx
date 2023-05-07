import { BiBlock } from 'react-icons/bi';
import { blockCustomer } from '../repository/customer';

export default function CustomerTile(props) {
  return (
    <div className="w-full py-4 px-4 rounded-lg shadow-md flex justify-between items-center bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all">
      {props.customer.name}
      <button
        onClick={() => blockCustomer(props.customer._id)}
        className="grid place-items-center hover:bg-gray-200 dark:hoverbg-gray-800 transition-all rounded-full w-8 h-8"
      >
        <BiBlock />
      </button>
    </div>
  );
}
