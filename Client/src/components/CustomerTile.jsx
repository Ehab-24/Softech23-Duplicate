export default function CustomerTile(props) {
    return (
        <div className="w-full py-4 px-4 rounded-lg shadow-md flex justify-between items-center bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all">
            {props.customer.name}
        </div>
    )
}