import { useState, useEffect } from 'react';
import InventoryItemForm from '../components/InventoryItemForm';
import { getInventoryItems } from '../repository/inventory';
import Spinner from '../components/Spinner';
import InventoryList from '../components/InventoryList';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';

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

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal} className="grid place-items-center hover:bg-gray-200 dark:hoverbg-gray-800 transition-all rounded-full w-8 h-8">
        <IoMdAdd />
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className="w-full flex justify-end">
          <button onClick={closeModal} className="grid place-items-center hover:bg-gray-200 dark:hoverbg-gray-800 transition-all rounded-full w-8 h-8">
            <AiOutlineClose />
          </button>
        </div>
        <InventoryItemForm />
      </Modal>

      <div className="h-8"></div>
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
