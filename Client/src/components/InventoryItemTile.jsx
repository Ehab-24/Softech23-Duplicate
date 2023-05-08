import { useNavigate } from 'react-router-dom';
import { MdOutlineModeEdit } from 'react-icons/md';
import { useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import InventoryItemForm from './InventoryItemForm';
import { deleteInventoryItem } from '../repository/inventory';
import Spinner from './Spinner';
import useInventoryStore from '../store/inventory';

export default function InventoryItemTile(props) {
  const item = props.item;
  const navigate = useNavigate();
  const removeItem = useInventoryStore((state) => state.removeItem);

  function handleClick() {
    navigate(`/inventory/${item._id}`);
  }

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function deleteItem() {
    setLoading(true);
    removeItem(item._id);
    deleteInventoryItem(props.item._id).then(() => {
      setLoading(false);
    });
  }
  
  return !loading ? (
    <div className="w-full rounded-lg shadow-md flex justify-between items-center bg-gray-50 dark:bg-gray-800 cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all">
      <section onClick={handleClick} className="w-full py-4 px-4 flex flex-col">
        <div className="flex items-center gap-2">
          <div className='w-28 flex items-center gap-1'>
            <p className="font-bold text-lg text-pink-900">
              {item.item_price}
            </p>
            <p className='text-sm text-pink-900'>pkr</p>
          </div>
          <h2 className="font-semibold text-gray-700">{item.item_title}</h2>
        </div>
        <p className='text-gray-600 text-sm italic mt-2 overflow-ellipsis'>
          {item.item_description}
        </p>
      </section>
      <button
        onClick={openModal}
        className="grid place-items-center hover:bg-gray-200 dark:hoverbg-gray-800 transition-all rounded-full w-8 h-8"
      >
        <MdOutlineModeEdit />
      </button>
      <div className="flex gap-4">
        <button
          onClick={deleteItem}
          className="grid place-items-center hover:bg-gray-200 dark:hoverbg-gray-800 transition-all rounded-full w-8 h-8"
        >
          <MdDelete />
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className="w-full flex justify-end">
          <button
            onClick={closeModal}
            className="grid place-items-center hover:bg-gray-200 dark:hoverbg-gray-800 transition-all rounded-full w-8 h-8"
          >
            <AiOutlineClose />
          </button>
        </div>
        <InventoryItemForm item={item} />
      </Modal>
    </div>
  ) : (
    <div className="w-full grid place-items-center">
      <Spinner />
    </div>
  );
}
