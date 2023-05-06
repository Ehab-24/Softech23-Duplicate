import InventoryItemForm from "../components/InventoryItemForm"

export default function Inventory() {
    
    function openModal() {
        document.getElementById('modal').showModal();
    }
    function closeModal() {
        document.getElementById('modal').closeModal();
    }
    
    return (
        <div>
            <dialog id='modal' className='rounded-lg p-4 bg-gray-50 dark:bg-gray-900'>
                <InventoryItemForm />
            </dialog>
            <h1 className="dark:text-gray-300 text-gray-700">Inventory Page</h1>
        </div>
    )
}