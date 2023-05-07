import InventoryItemTile from './InventoryItemTile';

export default function InventoryList(props) {
    return (
    <div className="flex flex-col gap-2">
      {props.inventory.map((item) => (
        <InventoryItemTile key={item._id} item={item} />
      ))}
    </div>
  );
}
