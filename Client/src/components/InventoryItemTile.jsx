import { useNavigate } from "react-router-dom";

export default function InventoryItemTile(props) {
  const item = props.item;
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/inventory/${item._id}`);
  }
  
  return (
    <div onClick={handleClick} className="w-full py-4 px-4 rounded-lg shadow-md flex justify-between items-center bg-gray-50 dark:bg-gray-800 cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all">
      {item._id}
    </div>
  );
}
