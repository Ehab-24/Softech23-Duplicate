import CustomerTile from './CustomerTile';

export default function CustomerList(props) {
  return (
    <div className='flex flex-col gap-2'>
      {props.customers.map((customer) => (
        <CustomerTile key={customer.id} customer={customer} />
      ))}
    </div>
  );
}
