import CustomerTile from './CustomerTile';

export default function CustomerList(props) {
  console.log(props.customers);
  return (
    <div className='flex flex-col gap-2'>
      {props.customers.map((customer) => (
        <CustomerTile key={customer._id} customer={customer} />
      ))}
    </div>
  );
}
