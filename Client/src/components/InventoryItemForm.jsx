import { createInventoryItem } from "../repository/inventory";

export default function InventoryItemForm() {
    
    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        createInventoryItem(data);
    }
    
//item_title, item_description, item_price, item_cost, item_quantity, inventory_type, item_images, mininmum_age

    return (
        <form onSubmit={handleSubmit}>
            <label for='item_title'>Title</label>
            <input id='item_title' placeholder="Item name..."/>

            <label for='minimun_age'>Price</label>
            <input id='minimum_age' type='number' placeholder="12..."/>

            <label for='item_quantity'>Quantity</label>
            <input id='item_quantity' type="number" placeholder="100"/>

            <label for='item_cost'>Cost</label>
            <input id='item_cost' type='number' placeholder="5000..."/>

            <label for='item_type'>Type</label>
            <input id='item_type' placeholder="Video Game..."/>
            
            <label for='item_description'>Description</label>
            <input id='item_description' placeholder="Description..."/>
        </form>  
    );
}

