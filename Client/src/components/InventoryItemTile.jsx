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
  const removeItem = useInventoryStore(state => state.removeItem);

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
    })
  }

  return (
    !loading? <div className="w-full h-16 rounded-lg shadow-md flex justify-between items-center bg-gray-50 dark:bg-gray-800 cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all">
      <section onClick={handleClick} className="w-full py-4 px-4">
        {item._id}
      </section>
      <button
        onClick={openModal}
        className="grid place-items-center hover:bg-gray-200 dark:hoverbg-gray-800 transition-all rounded-full w-8 h-8"
      >
        <MdOutlineModeEdit />
      </button>
      <div className="flex gap-4">
        <button onClick={deleteItem} className="grid place-items-center hover:bg-gray-200 dark:hoverbg-gray-800 transition-all rounded-full w-8 h-8">
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
  : <div className='w-full grid place-items-center'><Spinner /></div>);
}
