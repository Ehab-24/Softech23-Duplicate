import { useState, useEffect } from 'react';
import * as CustomerAPI from '../repository/customer';
import CustomerList from '../components/CustomerList';
import Spinner from '../components/Spinner';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback';
import { MdOutlineModeEdit } from 'react-icons/md';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [showBlockedCustomers, setShowBlockedCustomers] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    showBlockedCustomers
      ? CustomerAPI.getBlockedCustomers().then((response) => {
          setCustomers(response);
          setLoading(false);
        })
      : CustomerAPI.getRecentCustomers().then((response) => {
          setCustomers(response);
          setLoading(false);
        });
  }, [showBlockedCustomers]);

  return (
    <div>
      {/* Nav bar */}
      <nav className="mt-4 mb-8">
        <ul className="flex justify-center gap-8 font-bold mb-4">
          <li
            className={
              !showBlockedCustomers
                ? 'text-pink-500'
                : 'text-gray-700 dark:text-gray-300'
            }
          >
            <button onClick={() => setShowBlockedCustomers(false)}>
              Recent
            </button>
          </li>
          <li
            className={
              showBlockedCustomers
                ? 'text-pink-500'
                : 'text-gray-700 dark:text-gray-300'
            }
          >
            <button onClick={() => setShowBlockedCustomers(true)}>
              Blocked
            </button>
          </li>
        </ul>
      </nav>

      {/* Customers list */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="w-full flex flex-col items-center">
          {loading ? (
            <div className="mt-40 w-full h-full grid place-items-center">
              <Spinner />
            </div>
          ) : !!customers ? (
            <div className="w-full">
              <CustomerList customers={customers} />
            </div>
          ) : (
            <p>Coudl not load customers</p>
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
}
