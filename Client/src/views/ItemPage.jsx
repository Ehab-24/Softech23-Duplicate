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
          <div className="flex">
            <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {item.item_title}
            </h1>
            <div className="w-full md:w-2/3">
              <img
                src={item.item_images[0]}
                className="rounded-lg w-full cover mb-2"
              />
              <section className="w-full flex justify-between">
                <p className="flex gap-1 text-sm items-center">
                  <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                    {item.item_price}
                  </p>
                  pkr
                </p>
                <p className="flex gap-1 text-sm">
                  <p className="font-bold text-gray-600 dark:text-gray-400">
                    {item.item_quantity}
                  </p>
                  <p>Qtn</p>
                </p>
              </section>
            </div>
            <div>
              <p>{item.item_description}</p>
              <p>{item.minimum_age}</p>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
