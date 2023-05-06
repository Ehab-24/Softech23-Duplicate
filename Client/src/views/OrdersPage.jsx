import { useEffect, useState } from 'react';
import OrdersList from '../components/OrdersList';
import Spinner from '../components/Spinner';
import { getOrders } from '../repository/order';
import ErrorFallback from '../components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((response) => {
      setOrders(response);
      setLoading(false);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const { name, itemName, email, date } = event.target.elements;

    setLoading(true);
    getOrders(name.value, itemName.value, email.value, date.value).then(
      (response) => {
        setOrders(response);
        setLoading(false);
      }
    );
  }

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 items-end"
      >
        <button
          type="submit"
          className="w-32 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
        >
          Search
        </button>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <input
            placeholder="Customer name..."
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="name"
          />
          <input
            placeholder="Item name..."
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="itemName"
            type="text"
          />
          <input
            placeholder="customer email..."
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="email"
            type="email"
          />
          <input
            placeholder=""
            className="h-10 text-gray-500 px-2 bg-transparent border focus:border-gray-500 outline-none rounded-md"
            id="date"
            type="date"
          />
        </div>
      </form>

      <div className="h-12"></div>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {loading ? (
          <div className="mt-40 w-full grid place-items-center">
            <Spinner />
          </div>
        ) : !!orders ? (
          <OrdersList orders={orders} />
        ) : (
          <p className='text-black'>Could not load orders</p>
        )}
      </ErrorBoundary>
    </div>
  );
}
