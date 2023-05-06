import { useState, useEffect } from 'react';
import InventoryItemForm from '../components/InventoryItemForm';
import { getInventoryItems } from '../repository/inventory';
import Spinner from '../components/Spinner';
import InventoryList from '../components/InventoryList';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback';

export default function Inventory() {
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventoryItems().then((response) => {
      setInventory(response);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="dark:text-gray-300 text-gray-700">Inventory Page</h1>
      <InventoryItemForm />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {loading ? (
          <div className="mt-40 w-full h-full grid place-items-center">
            <Spinner />
          </div>
        ) : !!inventory ? (
          <InventoryList inventory={inventory} />
        ) : (
          <p>Could not load inventory items</p>
        )}
      </ErrorBoundary>
    </div>
  );
}
