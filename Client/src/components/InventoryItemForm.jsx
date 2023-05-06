import { createInventoryItem } from "../repository/inventory";

export default function InventoryItemForm() {
    
    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        createInventoryItem(data);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label for='title'>Title</label>
            <input id='title' placeholder="Item name..."/>

            <label for='quantity'>Quantity</label>
            <input id='quantity' type="number" placeholder="100"/>

            <label for='title'>Title</label>
            <input id='title' placeholder="Itme name..."/>

            <label for='title'>Title</label>
            <input id='title' placeholder="Itme name..."/>

            <label for='title'>Title</label>
            <input id='title' placeholder="Itme name..."/>
        </form>  
    );
}