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
          <div className="mt-8 flex items-start">
            <div className="flex flex-col w-full ">
              <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {item.item_title}
              </h1>
              <div>
                <img
                  src={item.item_images[0]}
                  className="rounded-lg w-full cover mb-2"
                />
              </div>
            </div>
            <div className="mt-10 ml-12 w-1/2">
              <section className="mb-8 flex gap-4">
                <h1 className="text-3xl text-slate-600">Minimum Age: </h1>
                <p className="text-3xl text-gray-600 font-semibold">
                  {item.minimum_age}
                </p>
              </section>
              <section className="mb-8 w-full flex justify-between">
                <p className="flex gap-1 text-pink-900 text-sm items-center">
                  <p className="text-3xl font-semibold text-pink-900 dark:text-pink-100">
                    {item.item_price}
                  </p>
                  pkr
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <p className="font-bold text-2xl text-gray-600 dark:text-gray-400">
                    {item.item_quantity}
                  </p>
                  <p >Qtn</p>
                </p>
              </section>
              <section>
                <h1 className="text-3xl text-slate-600">Description</h1>
                <p className="italic text-gray-600 font-semibold">
                  {item.item_description}
                </p>
              </section>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
