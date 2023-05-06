import InventoryItemTile from './InventoryItemTile';

export default function InventoryList(props) {
  
    console.log('~ inventory', props.inventory);
    return (
    <div className="flex flex-col gap-2">
      {props.inventory.map((item) => (
        <InventoryItemTile key={item._id} item={item} />
      ))}
    </div>
  );
}
