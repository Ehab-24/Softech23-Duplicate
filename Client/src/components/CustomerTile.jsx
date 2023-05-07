import { BiBlock } from 'react-icons/bi';
import { blockCustomer } from '../repository/customer';

export default function CustomerTile(props) {
  const cust = props.customer;
  return (
    <div className="w-full h-20 py-4 px-4 rounded-lg shadow-md flex justify-between items-center bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all">
      <section>
        <div>
          <h2 className="font-semibold text-gray-700">{cust.name}</h2>
          <p className="italic text-sm text-gray-700">{cust.email}</p>
        </div>
      </section>
      <button
        onClick={() =>
          blockCustomer(props.customer._id, !props.customer.blocked)
        }
        className="grid place-items-center hover:bg-gray-200 dark:hoverbg-gray-800 transition-all rounded-full w-8 h-8"
      >
        <BiBlock />
      </button>
    </div>
  );
}
