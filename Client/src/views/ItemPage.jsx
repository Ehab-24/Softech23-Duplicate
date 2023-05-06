import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import Spinner from '../components/Spinner';

export default function ItemPage() {
  const { item } = useLoaderData();
  return (
    <Suspense
      fallback={
        <div className="w-full mt-40 grid place-items-center">
          <Spinner />
        </div>
      }
    >
      <Await resolve={item}>
        {({ item }) => (
          <div>
            <h1>{item.item_title}</h1>
            <p>{item.item_price}</p>
            <p>{item.item_quantity}</p>
            <p>{item.item_description}</p>
            <p>{item.minimum_age}</p>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
