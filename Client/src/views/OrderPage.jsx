import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import Spinner from '../components/Spinner';

export default function OrderPage() {
  const { order } = useLoaderData();

  return (
    <Suspense fallback={<div className='w-full mt-40 grid place-items-center'><Spinner/></div>}>
      <Await resolve={order}>
        {(resolvedOrder) => (
          <div>
            <h1>Order Page</h1>
            <p>Id: {resolvedOrder.id}</p>
            <p>Price: {resolvedOrder.totalPrice}</p>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
