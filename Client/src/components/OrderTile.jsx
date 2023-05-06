import { useNavigate } from "react-router-dom";

export default function OrderTile(props) {
  const order = props.order;
  const orderDate = `${order.createdAt.getDate()}/${order.createdAt.getMonth()}/${order.createdAt.getFullYear()}`;
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/orders/${order.id}`);
  }
  
  return (
    <div onClick={handleClick} className="w-full py-4 px-4 rounded-lg shadow-md flex justify-between items-center bg-gray-50 dark:bg-gray-800 cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all">
      <div className="flex flex-col gap-2">
        <p className="dark:text-gray-200">{order.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-300">{orderDate}</p>
      </div>
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-300">
        <p className="text-lg font-bold">{order.price}</p>
        &nbsp; pkr
      </div>
    </div>
  );
}
