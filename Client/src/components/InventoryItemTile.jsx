import { useNavigate } from 'react-router-dom';
import { MdOutlineModeEdit } from 'react-icons/md';
import { useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import InventoryItemForm from './InventoryItemForm';

export default function InventoryItemTile(props) {
  const item = props.item;
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/inventory/${item._id}`);
  }

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="w-full rounded-lg shadow-md flex justify-between items-center bg-gray-50 dark:bg-gray-800 cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all">
      <section onClick={handleClick} className='w-full py-4 px-4'>{item._id}</section>
      <button
        onClick={openModal}
        className="grid place-items-center hover:bg-gray-200 dark:hoverbg-gray-800 transition-all rounded-full w-8 h-8"
      >
        <MdOutlineModeEdit />
      </button>
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
  );
}
