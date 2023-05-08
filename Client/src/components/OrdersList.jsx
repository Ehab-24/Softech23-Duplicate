import OrderTile from "./OrderTile";

export default function OrdersList(props) {
  return (
    <div className="flex flex-col gap-2">
      {props.orders.map((order) => (
        <OrderTile key={order.name} order={order} />
      ))}
    </div>
  );
}
