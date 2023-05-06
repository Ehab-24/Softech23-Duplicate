export default function ErrorPage(props) {
  return (
    <div className="w-full flex justify-center">
      <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
        {`Error! ${props.message}` ?? 'An error occurred!'}
      </h1>
    </div>
  );
}
