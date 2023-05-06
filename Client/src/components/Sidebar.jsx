import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="p-4 absolute md:static w-[320px] h-full bg-gray-50 border-r dark:border-gray-800 dark:bg-gray-900">
      <p className="mb-8 text-gray-500 dark:text-gray-400 text-xl font-bold tracking-wide">
        Sidebar
      </p>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-1">
          <Link
            to="/orders"
            className="w-full px-3 h-10 flex items-center bg-gray-50 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-300"
          >
            Orders
          </Link>
          <Link
            to="/customers"
            className="w-full px-3 h-10 flex items-center bg-gray-50 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-300"
          >
            Customers
          </Link>
          <Link
            to="/inventory"
            className="w-full px-3 h-10 flex items-center bg-gray-50 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-300"
          >
            Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
