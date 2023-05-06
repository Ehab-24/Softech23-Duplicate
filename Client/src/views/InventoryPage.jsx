import InventoryItemForm from '../components/InventoryItemForm';

export default function Inventory() {
  function openModal() {
    console.log('open')
    document.getElementById('modal').showModal();
  }
  function closeModal() {
    document.getElementById('modal').close();
  }

  return (
    <div>
      {/* <dialog
        id="modal"
        className="rounded-lg py-8 px-4 bg-gray-50 dark:bg-gray-900 flex flex-col items-end"
      >
        <button className="mr-4 font-bold text-lg" onClick={closeModal}>
          X
        </button> */}
        <InventoryItemForm />
        {/* </dialog> */}
      <button onClick={openModal}>Open</button>
      <h1 className="dark:text-gray-300 text-gray-700">Inventory Page</h1>
    </div>
  );
}
